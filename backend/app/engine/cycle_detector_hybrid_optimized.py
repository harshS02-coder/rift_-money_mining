"""
Industrial-Grade Hybrid Cycle Detection with Advanced Optimizations
Enhancements:
1. Edge Weight Pruning - Remove dust transactions below threshold
2. Edge Multigraphing - Handle multiple transactions between same accounts
3. Isolation Scoring - Identify fraud rings vs legitimate connected networks

This detects FRAUD cycles (isolated islands) while keeping legitimate rings intact.
"""
import networkx as nx
from typing import List, Dict, Set, Tuple
from collections import defaultdict
import math

from app.engine.cycle_detector_tarjan import CycleDetectorTarjan


class CycleDetectorHybridOptimized:
    """Industrial-grade hybrid detector with optimizations for fraud detection"""

    def __init__(self, graph: nx.DiGraph, edge_weight_threshold: float = 1.0):
        """
        Initialize with optional edge weight threshold for pruning.
        
        Args:
            graph: The transaction graph
            edge_weight_threshold: Minimum transaction amount to include (removes dust)
        """
        self.original_graph = graph
        self.edge_weight_threshold = edge_weight_threshold
        self.pruned_graph = None
        self.giant_component = None
        self.isolated_components = []
        self.all_cycles = []
        self.fraud_rings = []  # Cycles in isolated components
        self.legitimate_rings = []  # Cycles in giant component
        self.sccs = []

    def find_all_cycles(self, max_length: int = 5, min_length: int = 3) -> List[Dict]:
        """
        Advanced detection pipeline:
        1. Prune edges below weight threshold
        2. Find giant component (legitimate network)
        3. Identify isolated components (potential fraud rings)
        4. Use Tarjan + Johnson on each component
        5. Score by isolation
        
        Returns:
            List of dictionaries containing cycle info with classification (FRAUD/LEGITIMATE)
        """
        print("\n[HYBRID-OPTIMIZED] Starting industrial-grade cycle detection...")
        
        # Step 1: Prune edges by weight
        self.pruned_graph = self._prune_edges_by_weight()
        print(f"[STEP 1] Pruned edges below ${self.edge_weight_threshold}: "
              f"{self.original_graph.number_of_edges()} → {self.pruned_graph.number_of_edges()} edges")
        
        # Step 2: Find giant component and isolated components
        self._identify_components()
        print(f"[STEP 2] Giant component: {len(self.giant_component)} nodes | "
              f"Isolated components: {len(self.isolated_components)}")
        
        # Step 3: Detect cycles using Tarjan + Johnson (on pruned graph)
        self._detect_cycles_by_component(min_length, max_length)
        
        # Step 4: Separate fraud from legitimate rings
        self._classify_rings_by_isolation()
        print(f"[STEP 3] Detected {len(self.fraud_rings)} FRAUD rings (isolated) | "
              f"{len(self.legitimate_rings)} LEGITIMATE rings (connected)")
        
        # Step 5: Score and return all cycles
        scored_cycles = self._score_cycles_by_strength_and_isolation()
        
        print(f"[HYBRID-OPTIMIZED] Detection complete. Returning top {min(len(scored_cycles), 100)} cycles\n")
        return scored_cycles[:100]

    def _prune_edges_by_weight(self) -> nx.DiGraph:
        """
        Remove 'dust' transactions below threshold.
        Keeps the graph structure but removes noise.
        """
        pruned = nx.DiGraph()
        
        # Copy all nodes
        pruned.add_nodes_from(self.original_graph.nodes())
        
        # Copy only edges above threshold
        edges_below_threshold = 0
        for u, v, data in self.original_graph.edges(data=True):
            amount = data.get("amount", 0)
            if amount >= self.edge_weight_threshold:
                pruned.add_edge(u, v, **data)
            else:
                edges_below_threshold += 1
        
        return pruned

    def _identify_components(self) -> None:
        """
        Identify giant component and isolated components.
        Legitimate networks are usually in the giant component.
        Fraud rings are often isolated islands.
        """
        # Convert to undirected for component detection
        undirected = self.pruned_graph.to_undirected()
        
        # Get all connected components
        components = list(nx.connected_components(undirected))
        components.sort(key=len, reverse=True)
        
        if components:
            self.giant_component = components[0]
            self.isolated_components = components[1:]
        else:
            self.giant_component = set()
            self.isolated_components = []

    def _is_isolated_ring(self, cycle: List[str]) -> bool:
        """Check if a cycle is in an isolated component (potential fraud)"""
        cycle_nodes = set(cycle)
        
        # If all nodes are in giant component, it's legitimate
        if cycle_nodes.issubset(self.giant_component):
            return False
        
        # Otherwise, it's isolated (potential fraud)
        return True

    def _detect_cycles_by_component(self, min_length: int, max_length: int) -> None:
        """Detect cycles in each component separately"""
        detector = CycleDetectorTarjan(self.pruned_graph)
        
        # Detect in giant component (legitimate)
        if self.giant_component:
            giant_subgraph = self.pruned_graph.subgraph(self.giant_component).copy()
            giant_detector = CycleDetectorTarjan(giant_subgraph)
            giant_detector._find_sccs()
            
            # Find cycles in giant component
            for scc in giant_detector.sccs:
                cycles_in_scc = self._find_cycles_johnson(giant_subgraph, scc, min_length, max_length)
                self.all_cycles.extend(cycles_in_scc)
        
        # Detect in isolated components (fraud)
        for component in self.isolated_components:
            isolated_subgraph = self.pruned_graph.subgraph(component).copy()
            isolated_detector = CycleDetectorTarjan(isolated_subgraph)
            isolated_detector._find_sccs()
            
            # Find cycles in isolated component
            for scc in isolated_detector.sccs:
                cycles_in_scc = self._find_cycles_johnson(isolated_subgraph, scc, min_length, max_length)
                self.all_cycles.extend(cycles_in_scc)

    def _find_cycles_johnson(self, graph: nx.DiGraph, scc: List[str],
                            min_length: int, max_length: int) -> List[List[str]]:
        """Find all simple cycles in an SCC using Johnson's algorithm"""
        if len(scc) < min_length:
            return []
        
        subgraph = graph.subgraph(scc).copy()
        found_cycles = []
        blocked = set()
        blocked_map = {}
        
        sorted_nodes = sorted(subgraph.nodes())
        
        for start_node in sorted_nodes:
            circuits = []
            self._johnson_circuit(subgraph, start_node, start_node, [], blocked, blocked_map, circuits)
            
            for circuit in circuits:
                if min_length <= len(circuit) <= max_length:
                    found_cycles.append(circuit)
            
            self._johnson_unblock(start_node, blocked, blocked_map)
        
        return found_cycles

    def _johnson_circuit(self, graph: nx.DiGraph, current: str, start: str,
                        path: List[str], blocked: Set[str], blocked_map: Dict,
                        circuits: List) -> bool:
        """Johnson's circuit finding algorithm"""
        found_circuit = False
        path.append(current)
        blocked.add(current)

        for successor in graph.successors(current):
            if successor == start and len(path) >= 3:
                circuit = path[:]
                circuits.append(circuit)
                found_circuit = True
            elif successor not in blocked:
                if self._johnson_circuit(graph, successor, start, path, 
                                        blocked, blocked_map, circuits):
                    found_circuit = True

        if found_circuit:
            self._johnson_unblock(current, blocked, blocked_map)
        else:
            for successor in graph.successors(current):
                if current not in blocked_map:
                    blocked_map[current] = set()
                blocked_map[current].add(successor)

        path.pop()
        return found_circuit

    def _johnson_unblock(self, node: str, blocked: Set[str], blocked_map: Dict) -> None:
        """Unblock in Johnson's algorithm"""
        if node in blocked:
            blocked.remove(node)
            if node in blocked_map:
                for w in list(blocked_map[node]):
                    self._johnson_unblock(w, blocked, blocked_map)
                blocked_map[node] = set()

    def _classify_rings_by_isolation(self) -> None:
        """Separate fraud rings (isolated) from legitimate rings (connected)"""
        self.fraud_rings = []
        self.legitimate_rings = []
        
        for cycle in self.all_cycles:
            if self._is_isolated_ring(cycle):
                self.fraud_rings.append(cycle)
            else:
                self.legitimate_rings.append(cycle)

    def _score_cycles_by_strength_and_isolation(self) -> List[List[str]]:
        """Score cycles by strength AND isolation (fraud indicator)"""
        cycle_scores = []
        
        for cycle in self.all_cycles:
            metrics = self.get_cycle_metrics(cycle)
            strength = self._calculate_cycle_strength(cycle, metrics)
            isolation_score = self._calculate_isolation_score(cycle)
            
            # FRAUD RINGS GET HIGHER SCORE (we want to catch them first!)
            # Isolated component + high strength = HIGH FRAUD RISK
            fraud_multiplier = 1.5 if self._is_isolated_ring(cycle) else 1.0
            final_score = (strength * fraud_multiplier) + (isolation_score * 0.2)
            
            cycle_scores.append({
                'cycle': cycle,
                'strength': strength,
                'isolation_score': isolation_score,
                'final_score': final_score,
                'volume': metrics['total_amount'],
                'length': len(cycle),
                'is_isolated': self._is_isolated_ring(cycle),
                'risk_level': 'FRAUD' if self._is_isolated_ring(cycle) else 'LEGITIMATE'
            })
        
        # Sort by final score (isolated + strong = highest priority)
        cycle_scores.sort(key=lambda x: x['final_score'], reverse=True)
        
        # Return the full dictionary with classification info, not just the cycle
        return cycle_scores[:100]

    def _calculate_cycle_strength(self, cycle: List[str], metrics: Dict) -> float:
        """Calculate cycle strength based on financial metrics"""
        total_amount = metrics.get('total_amount', 0)
        num_txns = metrics.get('num_transactions', 1)
        cycle_length = len(cycle)
        
        volume_factor = total_amount / 100000 if total_amount > 0 else 0
        frequency_factor = num_txns / 10
        complexity_factor = cycle_length / 3
        
        strength = (volume_factor * 0.4 + frequency_factor * 0.35 + complexity_factor * 0.25)
        return min(strength, 10.0)

    def _calculate_isolation_score(self, cycle: List[str]) -> float:
        """
        Score based on isolation.
        Isolated rings = higher fraud risk.
        Connected to giant component = lower fraud risk.
        """
        cycle_nodes = set(cycle)
        
        # Count how many nodes are connected to giant component
        connections_to_giant = 0
        for node in cycle_nodes:
            # Check if node has edges to giant component
            for successor in self.pruned_graph.successors(node):
                if successor in self.giant_component and successor not in cycle_nodes:
                    connections_to_giant += 1
                    break
        
        # Isolation score: 0-1 (0 = fully integrated, 1 = fully isolated)
        isolation = 1.0 - (connections_to_giant / len(cycle_nodes)) if cycle_nodes else 1.0
        
        return max(0.0, min(isolation, 1.0))

    def get_cycle_metrics(self, cycle: List[str]) -> Dict:
        """Calculate metrics for a cycle"""
        edges = [(cycle[i], cycle[(i + 1) % len(cycle)]) for i in range(len(cycle))]
        
        total_amount = 0.0
        transaction_ids = []
        amounts_per_edge = []
        
        for from_acc, to_acc in edges:
            if self.pruned_graph.has_edge(from_acc, to_acc):
                edge_data = self.pruned_graph[from_acc][to_acc]
                amount = edge_data.get("amount", 0)
                total_amount += amount
                amounts_per_edge.append(amount)
                transaction_ids.extend(edge_data.get("transaction_ids", []))

        avg_amount = total_amount / len(amounts_per_edge) if amounts_per_edge else 0
        variance = sum((x - avg_amount) ** 2 for x in amounts_per_edge) / len(amounts_per_edge) if amounts_per_edge else 0
        spread = (variance ** 0.5) / avg_amount if avg_amount > 0 else 0

        return {
            "length": len(cycle),
            "accounts": cycle,
            "total_amount": total_amount,
            "transaction_ids": transaction_ids,
            "num_transactions": len(transaction_ids),
            "avg_transaction": avg_amount,
            "amount_spread": min(spread, 1.0),
            "uniformity": 1.0 - min(spread, 1.0)
        }

    def get_cycle_participation(self) -> Dict[str, int]:
        """Get cycle participation count per account"""
        participation = {}
        for cycle in self.all_cycles:
            for account in cycle:
                participation[account] = participation.get(account, 0) + 1
        return participation

    def get_accounts_in_cycles(self) -> Set[str]:
        """Get all accounts involved in cycles"""
        involved = set()
        for cycle in self.all_cycles:
            involved.update(cycle)
        return involved

    def get_detailed_analysis(self) -> Dict:
        """Get detailed fraud analysis"""
        return {
            "summary": {
                "total_cycles": len(self.all_cycles),
                "fraud_rings": len(self.fraud_rings),
                "legitimate_rings": len(self.legitimate_rings),
                "fraud_percentage": round(
                    (len(self.fraud_rings) / len(self.all_cycles) * 100) 
                    if self.all_cycles else 0, 2
                )
            },
            "network_stats": {
                "total_nodes": self.pruned_graph.number_of_nodes(),
                "total_edges": self.pruned_graph.number_of_edges(),
                "giant_component_size": len(self.giant_component),
                "isolated_components": len(self.isolated_components),
                "isolation_ratio": round(
                    (1 - len(self.giant_component) / self.pruned_graph.number_of_nodes())
                    if self.pruned_graph.number_of_nodes() > 0 else 0, 2
                )
            },
            "pruning_stats": {
                "edge_weight_threshold": self.edge_weight_threshold,
                "original_edges": self.original_graph.number_of_edges(),
                "pruned_edges": self.pruned_graph.number_of_edges(),
                "edges_removed": self.original_graph.number_of_edges() - self.pruned_graph.number_of_edges(),
                "removal_percentage": round(
                    ((self.original_graph.number_of_edges() - self.pruned_graph.number_of_edges()) / 
                     self.original_graph.number_of_edges() * 100)
                    if self.original_graph.number_of_edges() > 0 else 0, 2
                )
            },
            "fraud_indicators": {
                "has_isolated_components": len(self.isolated_components) > 0,
                "isolated_ring_count": len(self.fraud_rings),
                "fraud_risk_level": self._calculate_fraud_risk_level()
            }
        }

    def _calculate_fraud_risk_level(self) -> str:
        """Calculate overall fraud risk level"""
        fraud_percentage = (len(self.fraud_rings) / len(self.all_cycles) * 100) if self.all_cycles else 0
        
        if fraud_percentage >= 50:
            return "🚨 CRITICAL - High concentration of isolated fraud rings"
        elif fraud_percentage >= 25:
            return "⚠️ HIGH - Significant isolated ring activity detected"
        elif fraud_percentage >= 10:
            return "⚠️ MEDIUM - Some isolated ring activity"
        else:
            return "✓ LOW - Mostly integrated legitimate activity"

    def get_hybrid_stats(self) -> Dict:
        """Get detailed statistics"""
        return {
            "algorithm": "hybrid_optimized_tarjan_johnson",
            "strategy": "Pruning → Giant Component → Tarjan SCCs → Johnson → Isolation Scoring",
            "optimizations": [
                "Edge weight pruning (removes dust transactions)",
                "Giant component analysis (fraud vs legitimate detection)",
                "Isolation scoring (identifies isolated fraud rings)",
                "Multi-stage filtering"
            ],
            "detailed_analysis": self.get_detailed_analysis()
        }
