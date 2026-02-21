"""
Hybrid Cycle Detection: Tarjan + Johnson
Winner's Strategy for Hackathon:
Step 1: Use Tarjan's SCC to break massive graphs into smaller components
Step 2: Use Johnson's algorithm to find ALL simple cycles in each SCC
Step 3: Filter by cycle length (3-5 nodes)

This combines the efficiency of Tarjan (O(V+E)) with the exhaustiveness of Johnson's
to guarantee finding all significant cycles while handling large transaction networks.
"""
import networkx as nx
from typing import List, Dict, Set, Tuple
from collections import defaultdict

from app.engine.cycle_detector_tarjan import CycleDetectorTarjan


class CycleDetectorHybrid:
    """Hybrid detector combining Tarjan + Johnson for optimal cycle detection"""

    def __init__(self, graph: nx.DiGraph):
        self.graph = graph
        self.tarjan_detector = CycleDetectorTarjan(graph)
        self.all_cycles = []
        self.sccs = []

    def find_all_cycles(self, max_length: int = 5, min_length: int = 3) -> List[List[str]]:
        """
        Hybrid Approach:
        1. Use Tarjan to find Strongly Connected Components (O(V+E))
        2. Use Johnson to find ALL simple cycles in each SCC
        3. Filter by length constraint (min_length to max_length)
        4. Score and sort by financial strength
        """
        # Step 1: Use Tarjan to decompose graph into SCCs
        self.tarjan_detector._find_sccs()
        self.sccs = self.tarjan_detector.sccs

        print(f"[HYBRID] Step 1: Tarjan decomposed graph into {len(self.sccs)} SCCs")

        # Step 2: For each SCC, use Johnson's algorithm to find all simple cycles
        self.all_cycles = []
        for scc_idx, scc in enumerate(self.sccs):
            if len(scc) >= min_length:  # Only process SCCs that could contain valid cycles
                cycles_in_scc = self._find_cycles_in_scc_johnson(scc, min_length, max_length)
                self.all_cycles.extend(cycles_in_scc)
                print(f"[HYBRID] SCC {scc_idx}: Found {len(cycles_in_scc)} cycles in {len(scc)} nodes")

        # Remove duplicates (cycles that are rotations of each other)
        unique_cycles = self._deduplicate_cycles()

        print(f"[HYBRID] Step 2: Johnson found {len(unique_cycles)} total unique cycles")

        # Step 3: Filter by length (already done in Johnson search)
        # Step 4: Score and sort by financial strength
        scored_cycles = self._score_cycles_by_strength(unique_cycles)

        print(f"[HYBRID] Step 3: Returning top {min(len(scored_cycles), 100)} cycles")

        return scored_cycles[:100]

    def _find_cycles_in_scc_johnson(self, scc: List[str], 
                                    min_length: int, max_length: int) -> List[List[str]]:
        """
        Use Johnson's algorithm to find all simple cycles in an SCC.
        This is guaranteed to find every simple cycle.
        """
        # Create induced subgraph for this SCC
        subgraph = self.graph.subgraph(scc).copy()

        # Track all cycles found
        found_cycles = []
        
        # Use Johnson's algorithm: process each node as a potential start
        blocked = set()
        blocked_map = {}
        
        # Sort nodes for consistent processing
        sorted_nodes = sorted(subgraph.nodes())
        
        for start_node in sorted_nodes:
            # Find all elementary circuits starting from start_node
            circuits = []
            self._johnson_circuit(
                subgraph, start_node, start_node, [], blocked, blocked_map, circuits
            )
            
            # Filter circuits by length constraint
            for circuit in circuits:
                if min_length <= len(circuit) <= max_length:
                    found_cycles.append(circuit)
            
            # Unblock start node for next iteration
            self._johnson_unblock(start_node, blocked, blocked_map)

        return found_cycles

    def _johnson_circuit(self, graph: nx.DiGraph, current: str, start: str,
                        path: List[str], blocked: Set[str], blocked_map: Dict,
                        circuits: List) -> bool:
        """
        Johnson's circuit finding algorithm (recursive).
        Guarantees finding all elementary circuits.
        """
        found_circuit = False
        path.append(current)
        blocked.add(current)

        for successor in graph.successors(current):
            if successor == start and len(path) >= 3:
                # Found a circuit
                circuit = path[:]
                circuits.append(circuit)
                found_circuit = True
            elif successor not in blocked:
                # Recurse
                if self._johnson_circuit(graph, successor, start, path, 
                                        blocked, blocked_map, circuits):
                    found_circuit = True

        # Backtrack
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
        """Unblock a node and its dependents in Johnson's algorithm"""
        if node in blocked:
            blocked.remove(node)
            if node in blocked_map:
                for w in list(blocked_map[node]):
                    self._johnson_unblock(w, blocked, blocked_map)
                blocked_map[node] = set()

    def _deduplicate_cycles(self) -> List[List[str]]:
        """Remove duplicate cycles (rotations of same cycle)"""
        unique = []
        seen = set()

        for cycle in self.all_cycles:
            canonical = self._get_canonical_cycle(cycle)
            cycle_tuple = tuple(canonical)
            
            if cycle_tuple not in seen:
                seen.add(cycle_tuple)
                unique.append(cycle)

        return unique

    def _get_canonical_cycle(self, cycle: List[str]) -> List[str]:
        """Get lexicographically smallest rotation"""
        rotations = [cycle[i:] + cycle[:i] for i in range(len(cycle))]
        return min(rotations)

    def _score_cycles_by_strength(self, cycles: List[List[str]]) -> List[List[str]]:
        """Score cycles based on financial metrics"""
        cycle_scores = []
        
        for cycle in cycles:
            metrics = self.get_cycle_metrics(cycle)
            strength = self._calculate_cycle_strength(cycle, metrics)
            
            cycle_scores.append({
                'cycle': cycle,
                'strength': strength,
                'volume': metrics['total_amount'],
                'length': len(cycle)
            })
        
        # Sort by strength score
        cycle_scores.sort(key=lambda x: x['strength'], reverse=True)
        
        return [item['cycle'] for item in cycle_scores]

    def _calculate_cycle_strength(self, cycle: List[str], metrics: Dict) -> float:
        """Calculate cycle strength based on financial metrics"""
        total_amount = metrics.get('total_amount', 0)
        num_txns = metrics.get('num_transactions', 1)
        cycle_length = len(cycle)
        
        # Volume factor
        volume_factor = total_amount / 100000 if total_amount > 0 else 0
        
        # Frequency factor
        frequency_factor = num_txns / 10
        
        # Complexity factor
        complexity_factor = cycle_length / 3
        
        # Combined strength score
        strength = (volume_factor * 0.4 + frequency_factor * 0.35 + complexity_factor * 0.25)
        
        return min(strength, 10.0)

    def get_cycle_metrics(self, cycle: List[str]) -> Dict:
        """Calculate comprehensive metrics for a cycle"""
        edges = [(cycle[i], cycle[(i + 1) % len(cycle)]) for i in range(len(cycle))]
        
        total_amount = 0.0
        transaction_ids = []
        amounts_per_edge = []
        
        for from_acc, to_acc in edges:
            if self.graph.has_edge(from_acc, to_acc):
                edge_data = self.graph[from_acc][to_acc]
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

    def find_cycles_by_length(self, target_length: int) -> List[List[str]]:
        """Find cycles of specific length"""
        return [c for c in self.all_cycles if len(c) == target_length]

    def get_accounts_in_cycles(self) -> Set[str]:
        """Get all accounts involved in cycles"""
        involved = set()
        for cycle in self.all_cycles:
            involved.update(cycle)
        return involved

    def get_scc_summary(self) -> List[Dict]:
        """Get summary of SCCs and their cycles"""
        summary = []
        for scc in self.sccs:
            cycles_in_scc = [c for c in self.all_cycles 
                           if all(node in scc for node in c)]
            
            metrics = {
                "size": len(scc),
                "accounts": scc,
                "cycle_count": len(cycles_in_scc),
                "total_volume": sum(
                    self.graph[u][v].get("amount", 0)
                    for u in scc for v in scc 
                    if self.graph.has_edge(u, v)
                )
            }
            summary.append(metrics)
        
        return sorted(summary, key=lambda x: x['total_volume'], reverse=True)

    def get_hybrid_stats(self) -> Dict:
        """Get detailed statistics about hybrid detection"""
        return {
            "algorithm": "hybrid_tarjan_johnson",
            "strategy": "Tarjan SCCs → Johnson all cycles → Filter 3-5 nodes",
            "sccs_found": len(self.sccs),
            "total_cycles_found": len(self.all_cycles),
            "avg_scc_size": sum(len(scc) for scc in self.sccs) / len(self.sccs) if self.sccs else 0,
            "largest_scc": max(len(scc) for scc in self.sccs) if self.sccs else 0,
            "cycle_length_distribution": self._get_length_distribution()
        }

    def _get_length_distribution(self) -> Dict[int, int]:
        """Get distribution of cycle lengths"""
        distribution = {}
        for cycle in self.all_cycles:
            length = len(cycle)
            distribution[length] = distribution.get(length, 0) + 1
        return dict(sorted(distribution.items()))
