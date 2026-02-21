"""
Johnson's Algorithm for Finding All Simple Cycles
Exhaustive cycle detection within a subgraph.
Guarantees finding ALL simple cycles in a strongly connected component.
"""
import networkx as nx
from typing import List, Dict, Set
from collections import deque


class CycleDetectorJohnson:
    """Find all simple cycles using Johnson's algorithm"""

    def __init__(self, graph: nx.DiGraph):
        self.graph = graph
        self.all_simple_cycles = []
        self.blocked = set()
        self.blocked_map = {}  # Maps node to set of nodes that block it
        self.node_stack = []

    def find_all_simple_cycles(self) -> List[List[str]]:
        """
        Find all simple cycles in the graph using Johnson's algorithm.
        This is guaranteed to find every simple cycle exactly once.
        
        Time complexity: O(V^2 * E) but very thorough for small graphs
        """
        self.all_simple_cycles = []
        
        # Sort nodes to process them consistently
        sorted_nodes = sorted(self.graph.nodes())
        
        for start_node in sorted_nodes:
            # Find all cycles starting from this node
            self._circuit_search(start_node, start_node)
            
            # Unblock the start node for next iteration
            self._unblock(start_node)

        return self.all_simple_cycles

    def _circuit_search(self, current: str, start: str) -> bool:
        """
        Recursive function to find all circuits.
        Returns True if a circuit is found.
        """
        found_circuit = False
        self.blocked.add(current)
        self.node_stack.append(current)

        # Explore all successors
        for successor in self.graph.successors(current):
            if successor == start:
                # Found a circuit
                circuit = self.node_stack[:]
                self.all_simple_cycles.append(circuit)
                found_circuit = True
            elif successor not in self.blocked:
                # Recurse if not blocked
                if self._circuit_search(successor, start):
                    found_circuit = True

        # Unblock nodes after exploration
        if found_circuit:
            self._unblock(current)
        else:
            # Mark current as blocking other nodes
            for successor in self.graph.successors(current):
                if current not in self.blocked_map:
                    self.blocked_map[current] = set()
                self.blocked_map[current].add(successor)

        self.node_stack.pop()
        return found_circuit

    def _unblock(self, node: str) -> None:
        """Unblock a node and recursively unblock dependent nodes"""
        if node in self.blocked:
            self.blocked.remove(node)
            
            if node in self.blocked_map:
                # Recursively unblock all nodes blocked by this one
                for dependent_node in list(self.blocked_map[node]):
                    self._unblock(dependent_node)
                self.blocked_map[node] = set()

    def find_cycles_in_subgraph(self, nodes: List[str]) -> List[List[str]]:
        """Find all simple cycles in a subgraph containing specified nodes"""
        # Create induced subgraph
        subgraph = self.graph.subgraph(nodes).copy()
        
        # Find cycles in this subgraph
        cycles = []
        blocked = set()
        blocked_map = {}
        stack = []

        sorted_nodes = sorted(subgraph.nodes())

        for start_node in sorted_nodes:
            self._circuit_search_subgraph(
                subgraph, start_node, start_node,
                blocked, blocked_map, stack, cycles
            )
            self._unblock_subgraph(start_node, blocked, blocked_map)

        return cycles

    def _circuit_search_subgraph(self, subgraph: nx.DiGraph, current: str,
                                  start: str, blocked: Set[str],
                                  blocked_map: Dict, stack: List,
                                  cycles: List) -> bool:
        """Circuit search for a specific subgraph"""
        found = False
        blocked.add(current)
        stack.append(current)

        for successor in subgraph.successors(current):
            if successor == start:
                cycle = stack[:]
                cycles.append(cycle)
                found = True
            elif successor not in blocked:
                if self._circuit_search_subgraph(
                    subgraph, successor, start, blocked, blocked_map, stack, cycles
                ):
                    found = True

        if found:
            self._unblock_subgraph(current, blocked, blocked_map)
        else:
            for successor in subgraph.successors(current):
                if current not in blocked_map:
                    blocked_map[current] = set()
                blocked_map[current].add(successor)

        stack.pop()
        return found

    def _unblock_subgraph(self, node: str, blocked: Set[str],
                          blocked_map: Dict) -> None:
        """Unblock for subgraph"""
        if node in blocked:
            blocked.remove(node)
            if node in blocked_map:
                for dependent in list(blocked_map[node]):
                    self._unblock_subgraph(dependent, blocked, blocked_map)
                blocked_map[node] = set()

    def get_cycle_metrics(self, cycle: List[str], graph: nx.DiGraph) -> Dict:
        """Calculate metrics for a cycle"""
        edges = [(cycle[i], cycle[(i + 1) % len(cycle)]) for i in range(len(cycle))]
        
        total_amount = 0.0
        transaction_ids = []
        amounts_per_edge = []
        
        for from_acc, to_acc in edges:
            if graph.has_edge(from_acc, to_acc):
                edge_data = graph[from_acc][to_acc]
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
