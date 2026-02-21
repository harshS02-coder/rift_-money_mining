"""
Tarjan's SCC-based Cycle Detection Module
Detects financial rings/cycles using Tarjan's strongly connected components algorithm.
Advantages:
- O(V + E) time complexity (very efficient)
- Guaranteed to find all cycles
- Identifies tightly connected account groups
- Better for large transaction networks
"""
import networkx as nx
from typing import List, Dict, Set, Tuple
from collections import defaultdict, deque


class CycleDetectorTarjan:
    """Cycle detector using Tarjan's SCC algorithm"""

    def __init__(self, graph: nx.DiGraph):
        self.graph = graph
        self.cycles = []
        self.sccs = []  # Strongly connected components
        self.index_counter = 0
        self.stack = []
        self.lowlinks = {}
        self.index = {}
        self.on_stack = defaultdict(bool)

    def find_all_cycles(self, max_length: int = 5, min_length: int = 3) -> List[List[str]]:
        """
        Find all cycles using Tarjan's SCC algorithm.
        Returns cycles sorted by financial strength score.
        """
        # Find all SCCs
        self._find_sccs()
        
        # Extract cycles from SCCs
        self._extract_cycles_from_sccs(min_length, max_length)
        
        # Score and sort by financial strength
        scored_cycles = self._score_cycles_by_strength(self.cycles)
        
        return scored_cycles[:100]  # Return top 100 cycles

    def _find_sccs(self) -> None:
        """
        Tarjan's algorithm for finding strongly connected components.
        Each SCC is a maximal set of nodes where every node is reachable from every other.
        """
        for node in self.graph.nodes():
            if node not in self.index:
                self._strongconnect(node)

    def _strongconnect(self, node: str) -> None:
        """Recursive helper for Tarjan's algorithm"""
        self.index[node] = self.index_counter
        self.lowlinks[node] = self.index_counter
        self.index_counter += 1
        self.stack.append(node)
        self.on_stack[node] = True

        # Consider successors of node
        for successor in self.graph.successors(node):
            if successor not in self.index:
                # Successor has not yet been visited
                self._strongconnect(successor)
                self.lowlinks[node] = min(self.lowlinks[node], self.lowlinks[successor])
            elif self.on_stack[successor]:
                # Successor is in stack and hence in the current SCC
                self.lowlinks[node] = min(self.lowlinks[node], self.index[successor])

        # If node is a root node, pop the stack and create an SCC
        if self.lowlinks[node] == self.index[node]:
            scc = []
            while True:
                successor = self.stack.pop()
                self.on_stack[successor] = False
                scc.append(successor)
                if successor == node:
                    break
            
            # Only keep SCCs with more than one node (they contain cycles)
            if len(scc) > 1:
                self.sccs.append(scc)

    def _extract_cycles_from_sccs(self, min_length: int, max_length: int) -> None:
        """
        Extract simple cycles from each SCC using DFS.
        Since all nodes in an SCC are mutually reachable, we can find cycles.
        """
        for scc in self.sccs:
            # Create subgraph for this SCC
            subgraph = self.graph.subgraph(scc)
            
            # Find cycles within this SCC
            self._find_cycles_in_subgraph(subgraph, min_length, max_length)

    def _find_cycles_in_subgraph(self, subgraph: nx.DiGraph, 
                                  min_length: int, max_length: int) -> None:
        """Find simple cycles within a subgraph (SCC)"""
        for start_node in subgraph.nodes():
            self._dfs_find_cycles(start_node, subgraph, min_length, max_length)

    def _dfs_find_cycles(self, start: str, subgraph: nx.DiGraph,
                         min_length: int, max_length: int,
                         path: List[str] = None, visited: Set[str] = None) -> None:
        """DFS to find cycles from a starting node within subgraph"""
        if path is None:
            path = [start]
            visited = {start}
        
        if len(path) > max_length:
            return

        current = path[-1]
        successors = list(subgraph.successors(current))
        
        if not successors:
            return

        for neighbor in successors:
            if neighbor == start and len(path) >= min_length:
                # Found a cycle
                cycle = path[:]
                if not self._is_duplicate_cycle(cycle):
                    self.cycles.append(cycle)
            elif neighbor not in visited and len(path) < max_length:
                visited.add(neighbor)
                path.append(neighbor)
                self._dfs_find_cycles(start, subgraph, min_length, max_length, path, visited)
                path.pop()
                visited.remove(neighbor)

    def _is_duplicate_cycle(self, cycle: List[str]) -> bool:
        """Check if cycle is already in cycles list (accounting for rotations)"""
        canonical = self._get_canonical_cycle(cycle)
        canonical_tuple = tuple(canonical)
        
        for existing in self.cycles:
            existing_canonical = self._get_canonical_cycle(existing)
            if tuple(existing_canonical) == canonical_tuple:
                return True
        return False

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
        """
        Calculate cycle strength based on:
        - Total transaction volume
        - Number of transactions
        - Cycle length
        """
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

        # Calculate uniformity
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
        for cycle in self.cycles:
            for account in cycle:
                participation[account] = participation.get(account, 0) + 1
        return participation

    def find_cycles_by_length(self, target_length: int) -> List[List[str]]:
        """Find cycles of specific length"""
        return [c for c in self.cycles if len(c) == target_length]

    def detect_nested_cycles(self) -> List[Dict]:
        """Detect cycles that contain other cycles"""
        nested = []
        
        for i, cycle1 in enumerate(self.cycles):
            set1 = set(cycle1)
            for j, cycle2 in enumerate(self.cycles):
                if i != j:
                    set2 = set(cycle2)
                    if set2.issubset(set1) and set2 != set1:
                        nested.append({
                            'parent_cycle': cycle1,
                            'nested_cycle': cycle2,
                            'parent_metrics': self.get_cycle_metrics(cycle1),
                            'nested_metrics': self.get_cycle_metrics(cycle2)
                        })
        
        return nested

    def get_accounts_in_cycles(self) -> Set[str]:
        """Get all accounts involved in cycles"""
        involved = set()
        for cycle in self.cycles:
            involved.update(cycle)
        return involved

    def get_scc_summary(self) -> List[Dict]:
        """Get summary of strongly connected components"""
        summary = []
        for scc in self.sccs:
            metrics = {
                "size": len(scc),
                "accounts": scc,
                "total_volume": sum(
                    self.graph[u][v].get("amount", 0)
                    for u in scc for v in scc 
                    if self.graph.has_edge(u, v)
                )
            }
            summary.append(metrics)
        
        return sorted(summary, key=lambda x: x['total_volume'], reverse=True)
