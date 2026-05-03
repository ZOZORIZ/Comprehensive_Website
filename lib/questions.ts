export type Question = {
  q: string
  options: [string, string, string, string]
  /** index of correct option, 0-3 */
  answer: 0 | 1 | 2 | 3
  /** difficulty level */
  difficulty?: 'Easy' | 'Hard'
  /** optional image path for circuit diagrams etc */
  image?: string
}

export type Module = {
  title: string
  subject: string
  questions: Question[]
}

export const modules: Module[] = [
  // =====================================================================
  {
    title: "Module I",
    subject: "Data Structures",
    questions: [
      // --- Algorithms, Complexity & Asymptotic Notation ---
      {
        q: "The measure of the amount of memory an algorithm requires during its execution is called:",
        options: ["Time Complexity", "Space Complexity", "Algorithmic Size", "Processor Load"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "Which asymptotic notation provides a tight bound (both upper and lower) on the growth of an algorithm?",
        options: ["Big-O (O)", "Big-Omega (Ω)", "Theta (Θ)", "Little-o (o)"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "The worst-case time complexity of accessing an element in an array by its index is:",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: 0,
        difficulty: "Easy",
      },
      {
        q: "If an algorithm divides the input size by half at each step, its time complexity is typically:",
        options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Big-O notation is primarily used to describe the:",
        options: ["Best-case scenario", "Average-case scenario", "Worst-case scenario", "Memory allocation"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "Which of the following time complexities represents the fastest algorithm for large values of n?",
        options: ["O(n)", "O(n log n)", "O(1)", "O(log n)"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Which notation represents the upper bound of an algorithm's time complexity?",
        options: ["Ω (Omega)", "Θ (Theta)", "O (Big-O)", "δ (Delta)"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "Which of the following best describes time complexity?",
        options: [
          "Amount of memory used by an algorithm",
          "Execution time of an algorithm as input grows",
          "Number of variables in a program",
          "Size of the output",
        ],
        answer: 1,
        difficulty: "Easy",
      },
      // --- Sparse Matrix ---
      {
        q: "A sparse matrix is defined as a matrix in which:",
        options: ["All elements are zero", "Most elements are non-zero", "Most elements are zero", "Diagonal elements are zero"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "To save memory, a sparse matrix is often represented using a 3-tuple format containing:",
        options: ["Row, Column, Value", "Size, Dimension, Value", "X, Y, Z coordinates", "Pointer, Node, Data"],
        answer: 0,
        difficulty: "Easy",
      },
      {
        q: "In the triplet representation of a sparse matrix, the first row typically stores:",
        options: ["The first non-zero element", "Total rows, total columns, and total non-zero elements", "Memory addresses", "Zeros"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "A sparse matrix is best represented using a linked list rather than a 2-D array because it:",
        options: [
          "Reduces access time for all elements",
          "Stores only non-zero elements, saving memory",
          "Eliminates the need for row and column indices",
          "Allows constant-time random access",
        ],
        answer: 1,
        difficulty: "Easy",
      },
      // --- Stacks ---
      {
        q: "A stack follows which underlying principle?",
        options: ["First-In, First-Out (FIFO)", "Last-In, First-Out (LIFO)", "Random Access", "Highest Priority First"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "The operation of adding an element to the top of a stack is called:",
        options: ["Pop", "Enqueue", "Push", "Insert"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "The operation of removing an element from a stack is called:",
        options: ["Pop", "Push", "Dequeue", "Delete"],
        answer: 0,
        difficulty: "Easy",
      },
      {
        q: "What condition occurs when you attempt to pop an element from an empty stack?",
        options: ["Stack Overflow", "Stack Underflow", "Segmentation Fault", "Deadlock"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "If a stack of size 10 has top = 9, what happens on another push?",
        options: ["Underflow", "Successful insertion", "Overflow", "Stack resets"],
        answer: 2,
        difficulty: "Hard",
      },
      // --- Conversion and Evaluation of Expressions ---
      {
        q: "The expression A + B is written in which format?",
        options: ["Prefix", "Postfix", "Infix", "Polish Notation"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "The postfix equivalent of the infix expression A * B is:",
        options: ["*AB", "AB*", "A*B", "*BA"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "Which data structure is best suited for evaluating postfix expressions?",
        options: ["Queue", "Linked List", "Stack", "Binary Tree"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Convert the infix expression (A + B) * C to postfix:",
        options: ["ABC*+", "AB+C*", "+AB*C", "*+ABC"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "Which data structure is used to convert an infix expression to a postfix expression?",
        options: ["Queue", "Tree", "Stack", "Array"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "Convert the infix expression A + B * C to postfix:",
        options: ["ABC*+", "AB+C*", "+A*BC", "ABC+*"],
        answer: 0,
        difficulty: "Hard",
      },
      // --- Queues ---
      {
        q: "A queue operates on which principle?",
        options: ["Last-In, First-Out (LIFO)", "First-In, First-Out (FIFO)", "First-In, Last-Out (FILO)", "Random Access"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "In a standard queue, insertions take place at the _____ and deletions take place at the _____.",
        options: ["Front, Rear", "Rear, Front", "Top, Bottom", "Middle, End"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "A circular queue is specifically designed to solve which problem found in a linear queue?",
        options: ["Slow insertion time", "Inability to store strings", "Wastage of memory space", "Difficulty in traversing"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "In a circular queue of size N, how is the Rear pointer updated during an enqueue operation?",
        options: ["Rear = Rear + 1", "Rear = (Rear + 1) % N", "Rear = Rear - 1", "Rear = (Rear % N) + 1"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "A Deque (Double-Ended Queue) allows insertion and deletion at:",
        options: ["Only the front", "Only the rear", "Both front and rear", "The middle only"],
        answer: 2,
        difficulty: "Easy",
      },
      // --- Linked Lists ---
      {
        q: "A singly linked list node contains:",
        options: ["Data only", "Pointer to next node only", "Data and pointer to the next node", "Data, previous pointer, and next pointer"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "The last node of a singly linked list always points to:",
        options: ["The Head", "NULL", "The previous node", "A random memory address"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "Which linked list allows traversal in both forward and backward directions?",
        options: ["Singly Linked List", "Circular Linked List", "Doubly Linked List", "Stack List"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "In a doubly linked list, each node contains how many pointers?",
        options: ["0", "1", "2", "3"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "What is the time complexity of deleting the first node of a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: 0,
        difficulty: "Hard",
      },
      {
        q: "In a circular linked list, the next pointer of the last node points to:",
        options: ["NULL", "The second node", "The Head (first node)", "The previous node"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "Which of the following is a disadvantage of linked lists compared to arrays?",
        options: ["Fixed size", "Lack of direct/random access to elements", "Inefficient insertions", "Slower deletions at the beginning"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "Time complexity of inserting an element at the beginning of a singly linked list is:",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        answer: 0,
        difficulty: "Easy",
      },
      {
        q: "In a Doubly Linked List, deleting a node requires updating how many pointers?",
        options: ["1", "2", "3", "4"],
        answer: 1,
        difficulty: "Hard",
      },
      // --- Trees & Binary Trees ---
      {
        q: "A tree is classified as a:",
        options: ["Linear data structure", "Non-linear data structure", "Stack-based structure", "Queue-based structure"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "In a binary tree, what is the maximum number of children a node can have?",
        options: ["1", "2", "3", "Unlimited"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "The top-most node of a tree is called the:",
        options: ["Leaf", "Branch", "Root", "Edge"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "A full binary tree (or strictly binary tree) is one where every node has either:",
        options: ["0 or 1 child", "1 or 2 children", "0 or 2 children", "Exactly 2 children"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Maximum number of nodes in a binary tree of height h (root at height 0)?",
        options: ["2^h", "2^(h+1) - 1", "2h - 1", "h^2"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "In an array-based binary tree using 0-based indexing, the right child of node at index i is:",
        options: ["2i", "2i + 1", "2i + 2", "i + 2"],
        answer: 2,
        difficulty: "Hard",
      },
      // --- Tree Traversals & BST ---
      {
        q: "Which tree traversal visits nodes in the order: Left Subtree, Root, Right Subtree?",
        options: ["Pre-order", "In-order", "Post-order", "Level-order"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "Which traversal visits nodes in the order: Root, Left Subtree, Right Subtree?",
        options: ["Pre-order", "In-order", "Post-order", "Level-order"],
        answer: 0,
        difficulty: "Easy",
      },
      {
        q: "In a Binary Search Tree (BST), the left child of a node is always _____ the parent, and the right child is always _____ the parent.",
        options: ["Greater than, Less than", "Less than, Greater than", "Equal to, Less than", "Greater than, Equal to"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "Performing an In-order traversal on a Binary Search Tree (BST) will output the elements in:",
        options: ["Random order", "Descending order", "Ascending order", "Unsorted order"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "The postfix expression traversal is functionally equivalent to which tree traversal?",
        options: ["Pre-order", "In-order", "Post-order", "Level-order"],
        answer: 2,
        difficulty: "Hard",
      },
      // --- Graphs ---
      {
        q: "A graph is a collection of:",
        options: ["Stacks and Queues", "Trees and Leaves", "Vertices (Nodes) and Edges", "Arrays and Pointers"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "Which algorithm explores a graph by going as deep as possible before backtracking?",
        options: ["Breadth First Search (BFS)", "Depth First Search (DFS)", "Binary Search", "Quick Sort"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "Depth First Search (DFS) is typically implemented using which underlying data structure?",
        options: ["Queue", "Stack", "Linked List", "Hash Table"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "Breadth First Search (BFS) is typically implemented using which underlying data structure?",
        options: ["Queue", "Stack", "Linked List", "Hash Table"],
        answer: 0,
        difficulty: "Hard",
      },
      {
        q: "Which of the following is a common application of graphs?",
        options: ["Evaluating math expressions", "Undo features in editors", "Finding the shortest path in GPS routing", "CPU scheduling"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "Time complexity of BFS on a graph with V vertices and E edges?",
        options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Which is an application of Depth First Search (DFS)?",
        options: [
          "Finding shortest path in unweighted graph",
          "Level order traversal",
          "Detecting cycles in a graph",
          "Priority scheduling",
        ],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Space complexity of an adjacency matrix for a graph with V vertices is:",
        options: ["O(V)", "O(E)", "O(V^2)", "O(V + E)"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "For a sparse graph with very few edges, the most memory-efficient representation is:",
        options: ["Adjacency matrix", "Incidence matrix", "Adjacency list", "Edge list with sorting"],
        answer: 2,
        difficulty: "Hard",
      },
      // --- Sorting Techniques ---
      {
        q: "Which sorting algorithm builds the final sorted array one element at a time by picking the next element and placing it into its correct position?",
        options: ["Quick Sort", "Hashing", "Insertion Sort", "Depth First Search"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "Quick Sort uses which algorithm design paradigm?",
        options: ["Dynamic Programming", "Greedy Method", "Divide and Conquer", "Backtracking"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "What is the average-case time complexity of Quick Sort?",
        options: ["O(n²)", "O(n)", "O(n log n)", "O(log n)"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Which sorting technique uses a 'pivot' element to partition the array?",
        options: ["Insertion Sort", "Quick Sort", "Bubble Sort", "Selection Sort"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "Worst-case time complexity of Quick Sort is:",
        options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"],
        answer: 2,
        difficulty: "Hard",
      },
      // --- Hashing ---
      {
        q: "Hashing is primarily used for:",
        options: ["Very fast data retrieval (search)", "Sorting data efficiently", "Drawing graph edges", "Balancing binary trees"],
        answer: 0,
        difficulty: "Easy",
      },
      {
        q: "A 'collision' in hashing occurs when:",
        options: ["The hash table runs out of memory", "Two different keys generate the same hash index", "A key generates a negative index", "The hash function crashes"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "Which hashing method squares the key and uses the middle digits of the result as the index?",
        options: ["Folding Method", "Division Method", "Digit Analysis", "Mid-square Method"],
        answer: 3,
        difficulty: "Hard",
      },
      {
        q: "In the division method of hashing, the hash function is typically H(k) = k mod M. To minimize collisions, M should ideally be:",
        options: ["An even number", "A power of 2", "A prime number", "A multiple of 10"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Which collision resolution or hash function technique involves breaking the key into equal-sized pieces and adding them together?",
        options: ["Mid-square Method", "Digit Analysis", "Division Method", "Folding Method"],
        answer: 3,
        difficulty: "Hard",
      },
      {
        q: "Which collision resolution technique stores all elements that hash to the same slot in a linked list?",
        options: ["Linear Probing", "Quadratic Probing", "Chaining", "Double Hashing"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Digit-analysis hashing yields better key distribution when:",
        options: [
          "Keys are random and uniformly distributed",
          "Keys share common patterns in certain digit positions",
          "Table size is a prime number",
          "Collision resolution uses chaining",
        ],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "Consider the following C program: CountNodes returns 0 if the node is NULL or a leaf (both children NULL), otherwise returns 1 + CountNodes(left) + CountNodes(right). What does CountNodes return when passed the root of a binary tree?",
        options: ["Number of nodes", "Number of leaf nodes", "Number of non-leaf nodes", "Number of leaf nodes minus number of non-leaf nodes"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Consider a hash table of size 7, starting index 0, and hash function (2x + 5) mod 7. If the table is initially empty, what are the contents after inserting 1, 4, 9, 6 using closed hashing?",
        options: ["9, _, 1, 6, _, _, 4", "1, _, 6, 9, _, _, 4", "4, _, 9, 6, _, _, 1", "1, _, 9, 6, _, _, 4"],
        answer: 3,
        difficulty: "Hard",
      },
    ],
  },

  // =====================================================================
  {
    title: "Module II",
    subject: "Logic Circuit Design",
    questions: [
      {
        q: "Which number system uses base 2?",
        options: ["Decimal", "Binary", "Octal", "Hexadecimal"],
        answer: 1,
      },
      {
        q: "Which number system maps exactly 4 bits to one digit, used as binary shorthand?",
        options: ["Octal", "Hexadecimal", "Decimal", "BCD"],
        answer: 1,
      },
      {
        q: "Which digit is NOT valid in the octal number system?",
        options: ["3", "5", "7", "8"],
        answer: 3,
      },
      {
        q: "The hexadecimal equivalent of decimal 15 is:",
        options: ["E", "D", "F", "10"],
        answer: 2,
      },
      {
        q: "Result of the hexadecimal subtraction (1A)16 − (0B)16:",
        options: ["(0F)16", "(11)16", "(10)16", "(09)16"],
        answer: 0,
      },
      {
        q: "Sum of (17)8 and (12)8 in octal:",
        options: ["(29)8", "(31)8", "(21)8", "(30)8"],
        answer: 1,
      },
      {
        q: "Octal 745 converted to hexadecimal is:",
        options: ["F5", "1E5", "3E5", "7A5"],
        answer: 1,
      },
      {
        q: "In signed 2's complement, the 8-bit value 11111101 represents:",
        options: ["-3", "-2", "-1", "-5"],
        answer: 0,
      },
      {
        q: "Which signed representation eliminates both +0 and −0?",
        options: ["Sign-magnitude", "One's complement", "Two's complement", "Excess-3"],
        answer: 2,
      },
      {
        q: "−0.625 in fixed-point binary with 3 fractional bits (sign-magnitude) is:",
        options: ["1.011", "0.101", "1.101", "0.011"],
        answer: 2,
      },
      {
        q: "Which representation allows very large and very small numeric values?",
        options: ["Fixed point", "BCD", "Floating point", "Gray code"],
        answer: 2,
      },
      {
        q: "Increasing the exponent bits of a floating-point format primarily:",
        options: [
          "Increases precision",
          "Reduces rounding error",
          "Increases dynamic range",
          "Speeds up computation",
        ],
        answer: 2,
      },
      {
        q: "BCD stands for:",
        options: ["Binary Coded Decimal", "Binary Calculated Digit", "Bit Coded Decimal", "Binary Coded Dual"],
        answer: 0,
      },
      {
        q: "Adding BCD digits 7 and 8 (with BCD correction) gives:",
        options: ["1111", "0101 0000", "0001 0101", "0001 0011"],
        answer: 2,
      },
      {
        q: "The Gray code is a:",
        options: ["Weighted code", "Cyclic / Unit-distance code", "Sequential code", "Alphanumeric code"],
        answer: 1,
      },
      {
        q: "Binary 11011 in Gray code is:",
        options: ["10110", "11110", "10111", "10101"],
        answer: 0,
      },
      {
        q: "Excess-3 code is also known as:",
        options: ["BCD + 2", "BCD + 3", "Self-complementing code", "Both B and C"],
        answer: 3,
      },
      {
        q: "Decimal 9 in 4-bit Excess-3 code is:",
        options: ["1001", "1100", "1111", "1010"],
        answer: 1,
      },
      {
        q: "According to De Morgan's theorem, A·B equals:",
        options: ["A'·B'", "A+B", "A'+B'", "A+B"],
        answer: 2,
      },
      {
        q: "Which Boolean law states A + A' = 1?",
        options: ["Commutative law", "Associative law", "Complement law", "Distributive law"],
        answer: 2,
      },
      {
        q: "The principle of duality states that an expression remains valid if:",
        options: [
          "ANDs are swapped with ORs",
          "1s are swapped with 0s",
          "Variables are complemented",
          "Both A and B",
        ],
        answer: 3,
      },
      {
        q: "Which form represents a Boolean function as a sum of minterms?",
        options: ["POS", "SOP", "Canonical POS", "Product form"],
        answer: 1,
      },
      {
        q: "Which gate is a universal gate?",
        options: ["AND", "OR", "NAND", "XOR"],
        answer: 2,
      },
      {
        q: "Karnaugh map is mainly used for:",
        options: [
          "Boolean expression evaluation",
          "Code conversion",
          "Logic circuit simulation",
          "Minimization of Boolean expressions",
        ],
        answer: 3,
      },
      {
        q: "In K-map minimization, a group of 8 adjacent cells (octet) eliminates:",
        options: ["2 variables", "3 variables", "4 variables", "8 variables"],
        answer: 2,
      },
      {
        q: "Simplify F = A·(A' + B):",
        options: ["A", "B", "A·B", "A+B"],
        answer: 2,
      },
      {
        q: "K-map for F(A,B,C) with minterms m(0,2,4,6) simplifies to:",
        options: ["A", "C", "C'", "B'"],
        answer: 2,
      },
      {
        q: "Which combinational circuit converts a decimal number into a binary code?",
        options: ["Decoder", "Encoder", "Multiplexer", "Demultiplexer"],
        answer: 1,
      },
      {
        q: "How many select lines are required for a 16-to-1 Multiplexer?",
        options: ["2", "3", "4", "8"],
        answer: 2,
      },
      {
        q: "How many 4-to-1 MUX are needed to construct a 16-to-1 MUX?",
        options: ["4", "5", "3", "16"],
        answer: 1,
      },
      {
        q: "In a 4:1 MUX with select S1S0 = 10, the input appearing at output is:",
        options: ["D0", "D1", "D2", "D3"],
        answer: 2,
      },
      {
        q: "Which device performs the reverse operation of an encoder?",
        options: ["Decoder", "Multiplexer", "Demultiplexer", "Comparator"],
        answer: 0,
      },
      {
        q: "A 2-to-4 line decoder with an enable input can also act as:",
        options: ["Multiplexer", "Demultiplexer", "Encoder", "Adder"],
        answer: 1,
      },
      {
        q: "In a 3-to-8 decoder, applying input 101 activates:",
        options: ["One output Y5", "Two outputs Y1 and Y5", "One output Y1", "All outputs"],
        answer: 0,
      },
      {
        q: "A Half Adder consists of which two logic gates?",
        options: ["AND and OR", "XOR and AND", "XOR and OR", "NAND and NOR"],
        answer: 1,
      },
      {
        q: "Which adder adds three input bits?",
        options: ["Half adder", "Full adder", "Parallel adder", "Ripple carry adder"],
        answer: 1,
      },
      {
        q: "A Full Subtractor requires how many inputs?",
        options: ["2", "3", "4", "1"],
        answer: 1,
      },
      {
        q: "To implement a Full Adder using two Half Adders, the additional gate required is:",
        options: ["AND", "OR", "NOT", "XOR"],
        answer: 1,
      },
      {
        q: "In a 4-bit ripple carry adder with 10 ns per full adder, worst-case delay is:",
        options: ["10 ns", "20 ns", "30 ns", "40 ns"],
        answer: 3,
      },
      {
        q: "In an S–R flip-flop, S=1 and R=1 is invalid because:",
        options: [
          "Output oscillates continuously",
          "Both outputs become 0, violating complementarity",
          "Clock signal is disabled",
          "Produces a metastable state only",
        ],
        answer: 1,
      },
      {
        q: "The 'Race Around Condition' is a problem in which flip-flop?",
        options: ["SR Flip-flop", "D Flip-flop", "JK Flip-flop", "T Flip-flop"],
        answer: 2,
      },
      {
        q: "In a JK flip-flop, when J=1 and K=1, the next state Qn+1 is:",
        options: ["0", "1", "No change", "Q'n (Toggle)"],
        answer: 3,
      },
      {
        q: "Which flip-flop is essentially a JK with J and K tied together?",
        options: ["D Flip-flop", "T Flip-flop", "RS Flip-flop", "Master-Slave Flip-flop"],
        answer: 1,
      },
      {
        q: "Master–Slave JK flip-flop is preferred mainly to:",
        options: [
          "Reduce power consumption",
          "Simplify combinational logic",
          "Eliminate the race-around condition",
          "Allow asynchronous operation",
        ],
        answer: 2,
      },
      {
        q: "Which shift register loads data all at once and shifts out one bit at a time?",
        options: ["SISO", "SIPO", "PISO", "PIPO"],
        answer: 2,
      },
      {
        q: "A SIPO shift register converts:",
        options: ["Serial to serial", "Parallel to serial", "Serial to parallel", "Parallel to parallel"],
        answer: 2,
      },
      {
        q: "A PIPO register storing a 4-bit word needs how many clock cycles to load?",
        options: ["1", "4", "0", "8"],
        answer: 0,
      },
      {
        q: "A Ring Counter with n flip-flops has how many distinct states?",
        options: ["n", "2^n", "2n", "n − 1"],
        answer: 0,
      },
      {
        q: "A Johnson counter with 5 flip-flops produces how many states?",
        options: ["5", "10", "32", "25"],
        answer: 1,
      },
      {
        q: "In an Asynchronous counter, the maximum operating frequency is limited because:",
        options: [
          "All flip-flops are clocked simultaneously",
          "Cumulative propagation delay causes incorrect transitions",
          "More hardware is required",
          "Clock skew is eliminated",
        ],
        answer: 1,
      },
      {
        q: "For a 3-bit synchronous DOWN counter, the next state after 000 is:",
        options: ["001", "111", "110", "101"],
        answer: 1,
      },
      {
        q: "In Verilog, which keyword represents a physical connection between structural elements?",
        options: ["Reg", "Wire", "Integer", "Parameter"],
        answer: 1,
      },
      {
        q: "Which Verilog modeling style uses an always block to describe logic?",
        options: ["Gate-level", "Structural", "Behavioral", "Literal"],
        answer: 2,
      },
      {
        q: "Verilog half adder: assign Sum = A ^ B; assign Carry = ___;",
        options: ["A | B", "A & B", "A ~^ B", "A + B"],
        answer: 1,
      },
      {
        q: "A 4-bit Ripple counter consists of Flip-Flops, each with a propagation delay from clock to Q output of 15ns. For the counter to recycle from 1111 to 0000, it takes a total of:",
        options: ["30ns", "45ns", "15ns", "60ns"],
        answer: 3,
        difficulty: "Hard",
      },
      {
        q: "The number of Boolean functions that can be generated by n-variables is equal to:",
        options: ["2ⁿ", "2^(2ⁿ)", "2^(n−1)", "−2ⁿ"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "In an 8-bit Johnson counter sequence, how many states orbit patterns are possible?",
        options: ["240", "228", "232", "220"],
        answer: 0,
        difficulty: "Hard",
      },
      {
        q: "Which of the following is a valid HDL modeling technique?",
        options: ["Behavioral", "Logical", "Algorithmic", "Software-based"],
        answer: 0,
        difficulty: "Easy",
      },
      {
        q: "In a 100 kHz clock frequency, 16 bits can be serially entered into a shift register in:",
        options: ["150 micro-sec", "160 micro-sec", "170 micro-sec", "180 micro-sec"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "What are the minimum number of 2-to-1 multiplexers required to generate a 2-input AND gate and a 2-input EX-OR gate?",
        options: ["1 and 2", "1 and 3", "1 and 1", "2 and 2"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "A mod-n counter using a synchronous binary up-counter with synchronous clear input is shown. gate to the CLEAR input. The value of n is:",
        options: ["7", "10", "15", "20"],
        answer: 1,
        difficulty: "Hard",
        image: "/mod10_counter.png",
      },
    ],
  },

  // =====================================================================
  {
    title: "Module III",
    subject: "Computer Organization and Architecture",
    questions: [
      {
        q: "Which functional unit performs arithmetic and logical operations?",
        options: ["Control Unit", "Memory Unit", "Arithmetic Logic Unit", "Input Unit"],
        answer: 2,
      },
      {
        q: "Which functional unit controls and coordinates all other units?",
        options: ["ALU", "Register", "Control Unit", "Cache"],
        answer: 2,
      },
      {
        q: "A system bus is used to:",
        options: [
          "Store data",
          "Perform computation",
          "Transfer data, address and control signals between units",
          "Decode instructions",
        ],
        answer: 2,
      },
      {
        q: "A memory location is identified by its:",
        options: ["Data value", "Instruction", "Address", "Size"],
        answer: 2,
      },
      {
        q: "Which memory operation reads data from memory?",
        options: ["Write", "Fetch", "Read", "Execute"],
        answer: 2,
      },
      {
        q: "During a memory read, the correct sequence is:",
        options: [
          "Address placed on bus, read signal asserted, data transferred to CPU",
          "Data placed on bus then address",
          "CPU writes data first then reads address",
          "Memory writes to disk first",
        ],
        answer: 0,
      },
      {
        q: "A byte-addressable memory stores a 32-bit word starting at 0x1004 (big-endian). The MSB is at:",
        options: ["0x1004", "0x1005", "0x1006", "0x1007"],
        answer: 0,
      },
      {
        q: "Addressing modes are used to:",
        options: [
          "Increase memory size",
          "Reduce instruction length",
          "Specify how operands are accessed",
          "Speed up ALU operations",
        ],
        answer: 2,
      },
      {
        q: "Which addressing mode places the operand's actual memory address directly in the instruction?",
        options: ["Immediate", "Register", "Direct", "Indirect"],
        answer: 2,
      },
      {
        q: "Which addressing mode requires two memory accesses to fetch the operand?",
        options: ["Immediate addressing", "Register addressing", "Direct addressing", "Indirect addressing"],
        answer: 3,
      },
      {
        q: "Instruction sequencing in a CPU is supported primarily by which register?",
        options: ["Accumulator", "Program Counter (PC)", "Instruction Register", "Stack Pointer"],
        answer: 1,
      },
      {
        q: "The instruction cycle consists of:",
        options: ["Fetch only", "Decode only", "Execute only", "Fetch, Decode and Execute"],
        answer: 3,
      },
      {
        q: "During the fetch phase, the correct micro-operation sequence is:",
        options: [
          "MDR ← Memory; IR ← MDR; PC ← PC + 1",
          "MAR ← PC; MDR ← Memory[MAR]; IR ← MDR; PC ← PC + 1",
          "IR ← PC; MAR ← MDR; PC ← PC − 1",
          "MAR ← IR; MDR ← Memory; PC ← PC + 1",
        ],
        answer: 1,
      },
      {
        q: "If PC = 400 and instruction length is 4 bytes, after fetch (branch not taken) PC becomes:",
        options: ["400", "401", "404", "Depends on branch"],
        answer: 2,
      },
      {
        q: "Register Transfer Logic (RTL) is mainly used to describe:",
        options: [
          "Data storage in memory",
          "Micro-operations / transfer of data between registers",
          "Instruction decoding",
          "ALU design",
        ],
        answer: 1,
      },
      {
        q: "RTL R2 ← R1 + R3 implies:",
        options: [
          "Data transfer without computation",
          "ALU arithmetic operation with register operands",
          "Memory-to-register transfer",
          "Control unit state transition only",
        ],
        answer: 1,
      },
      {
        q: "Arithmetic and shift micro-operations are executed by:",
        options: ["Control Unit", "Arithmetic Logic Unit (ALU)", "Cache", "DMA controller"],
        answer: 1,
      },
      {
        q: "Which algorithm is commonly used for binary multiplication of signed numbers?",
        options: ["Booth's algorithm", "Euclid's algorithm", "Dijkstra's algorithm", "Huffman algorithm"],
        answer: 0,
      },
      {
        q: "Booth's algorithm is mainly used to:",
        options: [
          "Reduce hardware cost",
          "Handle signed numbers efficiently",
          "Increase clock speed",
          "Eliminate carry propagation",
        ],
        answer: 1,
      },
      {
        q: "Which multiplier generates partial products simultaneously?",
        options: ["Booth multiplier", "Sequential multiplier", "Array multiplier", "Wallace tree multiplier"],
        answer: 2,
      },
      {
        q: "Pipelining improves processor performance by:",
        options: [
          "Reducing instruction size",
          "Increasing clock period",
          "Overlapping instruction execution",
          "Reducing memory size",
        ],
        answer: 2,
      },
      {
        q: "Which is an example of an arithmetic pipeline?",
        options: ["Instruction fetch", "Floating-point addition", "Interrupt handling", "Cache access"],
        answer: 1,
      },
      {
        q: "A data hazard in a pipeline occurs when:",
        options: [
          "Two instructions need same hardware",
          "Control flow changes",
          "An instruction depends on a previous instruction's result",
          "An interrupt occurs",
        ],
        answer: 2,
      },
      {
        q: "Hard-wired control is characterized by:",
        options: [
          "High flexibility",
          "Slow operation",
          "Use of microinstructions",
          "Fast operation but less flexible",
        ],
        answer: 3,
      },
      {
        q: "A key disadvantage of hard-wired control is:",
        options: [
          "Use of microinstructions",
          "Difficulty modifying the instruction set",
          "High cost of control memory",
          "Slow execution speed",
        ],
        answer: 1,
      },
      {
        q: "In microprogrammed control, control signals are generated by:",
        options: ["ALU", "Control memory", "Cache", "Register file"],
        answer: 1,
      },
      {
        q: "The microprogram sequencer is responsible for:",
        options: [
          "Decoding opcode directly into control signals",
          "Selecting and sequencing the next microinstruction address",
          "Executing arithmetic micro-operations",
          "Handling interrupt prioritization",
        ],
        answer: 1,
      },
      {
        q: "Horizontal microinstructions differ from vertical ones in:",
        options: [
          "Smaller control memory",
          "Fewer control signals per microinstruction",
          "Higher parallelism with wider words",
          "Slower execution due to decoding",
        ],
        answer: 2,
      },
      {
        q: "Which mechanism allows an I/O device to transfer data directly to memory without continuous CPU intervention?",
        options: ["Programmed I/O", "Interrupt-driven I/O", "Direct Memory Access (DMA)", "Memory-mapped I/O"],
        answer: 2,
      },
      {
        q: "Interrupt hardware in a real-time system is mainly designed to:",
        options: [
          "Reduce memory access latency",
          "Allow immediate response to asynchronous external events",
          "Eliminate polling completely",
          "Increase instruction throughput",
        ],
        answer: 1,
      },
      {
        q: "Semiconductor RAM differs from ROM in that RAM:",
        options: [
          "Is non-volatile",
          "Allows both read and write during normal execution",
          "Is used only for firmware",
          "Does not require address decoding",
        ],
        answer: 1,
      },
      {
        q: "Which memory stores permanent programs (firmware)?",
        options: ["RAM", "Cache", "ROM", "CAM"],
        answer: 2,
      },
      {
        q: "Cache mapping that allows any block to map to any line is:",
        options: ["Direct mapping", "Associative mapping", "Set-associative mapping", "Linear mapping"],
        answer: 1,
      },
      {
        q: "Which cache mapping offers a practical compromise between hardware complexity and hit ratio?",
        options: ["Direct mapping", "Fully associative mapping", "Set-associative mapping", "Random mapping"],
        answer: 2,
      },
      {
        q: "Content Addressable Memory (CAM) is accessed by:",
        options: ["Address only", "Content / data value", "Sequential index", "Disk block number"],
        answer: 1,
      },
      {
        q: "Consider a direct mapped cache of size 256 Kilo words with block size 512 words. There are 6 bits in the tag. The number of bits in block (index) and word (offset) fields of physical address are:",
        options: ["block (index) = 6 bits, word (offset) = 9 bits", "block (index) = 7 bits, word (offset) = 8 bits", "block (index) = 9 bits, word (offset) = 9 bits", "block (index) = 8 bits, word (offset) = 8 bits"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "The memory unit of a computer has 1 Giga words of 64 bits each. The instruction format has 4 fields: an opcode field; a mode field for 12 addressing modes; a register address field for 48 registers; and a memory address field. If an instruction is 64 bits long, how large is the opcode field?",
        options: ["34 bits", "24 bits", "20 bits", "14 bits"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "A computer has 64-bit instructions and a 28-bit address. Suppose there are 252 two-address instructions. How many 1-address instructions can be formulated?",
        options: ["2^24", "2^26", "2^28", "2^30"],
        answer: 3,
        difficulty: "Hard",
      },
      {
        q: "Determine the number of clock cycles required to process 200 tasks in a six-segment pipeline (assume no stalls, each segment takes 1 cycle):",
        options: ["1200 cycles", "206 cycles", "207 cycles", "205 cycles"],
        answer: 3,
        difficulty: "Hard",
      },
      {
        q: "Match: P.DMA  Q.Processor Status Word  R.Daisy Chaining  S.Handshaking with 1.Priority Interrupt 2.I/O Transfer 3.CPU 4.Asynchronous Data Transfer",
        options: ["P-1, Q-3, R-4, S-2", "P-2, Q-3, R-1, S-4", "P-2, Q-1, R-3, S-4", "P-4, Q-3, R-1, S-2"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "A computer uses 32-bit byte addressing with a 2-way set associative cache of 32KB capacity. Each cache block contains 16 bytes. The number of bits in TAG, SET, and OFFSET fields are:",
        options: ["TAG=18, SET=10, OFFSET=4", "TAG=16, SET=12, OFFSET=4", "TAG=20, SET=10, OFFSET=2", "TAG=16, SET=8, OFFSET=8"],
        answer: 0,
        difficulty: "Hard",
      },
      {
        q: "The Booth recoded form of -6 is:",
        options: ["-1 +1 0 -1 0", "+1 -1 +1 -1 0", "0 -1 +1 -1 0", "0 +1 -1 +1 0"],
        answer: 2,
        difficulty: "Hard",
      },
    ],
  },

  // =====================================================================
  {
    title: "Module IV",
    subject: "Operating Systems",
    questions: [
      {
        q: "The primary role of an operating system is:",
        options: [
          "Program execution only",
          "Resource management and abstraction between hardware and user",
          "User interface only",
          "Data storage",
        ],
        answer: 1,
      },
      {
        q: "Which OS service allows programs to request services from the kernel?",
        options: ["Interrupts", "System calls", "Context switching", "Scheduling"],
        answer: 1,
      },
      {
        q: "Which system call creates a new process in UNIX?",
        options: ["exec()", "wait()", "fork()", "exit()"],
        answer: 2,
      },
      {
        q: "In a layered OS, the main advantage is:",
        options: [
          "Faster execution due to parallel layers",
          "Easier debugging and modular verification",
          "Elimination of hardware dependency",
          "Reduced memory footprint",
        ],
        answer: 1,
      },
      {
        q: "In a microkernel architecture, which service typically runs in user space?",
        options: ["Process management", "Memory management", "Device drivers", "Scheduling"],
        answer: 2,
      },
      {
        q: "A microkernel improves system reliability primarily because:",
        options: [
          "It places all services in kernel space",
          "Reduced kernel size limits the impact of failures",
          "It eliminates system calls",
          "It avoids inter-process communication",
        ],
        answer: 1,
      },
      {
        q: "Which step occurs first in the system boot process?",
        options: ["Loading OS kernel", "Power-on self-test (POST)", "User login", "Process scheduling"],
        answer: 1,
      },
      {
        q: "Which IPC mechanism allows processes to share a common address space?",
        options: ["Message passing", "Pipes", "Shared memory", "Signals"],
        answer: 2,
      },
      {
        q: "In message-passing IPC, processes exchange data by:",
        options: [
          "Reading and writing shared variables",
          "Sending and receiving messages through the kernel",
          "Accessing common files only",
          "Using global registers",
        ],
        answer: 1,
      },
      {
        q: "Which scheduling algorithm is non-preemptive?",
        options: ["Round Robin", "Shortest Remaining Time", "First Come First Served", "Priority (preemptive)"],
        answer: 2,
      },
      {
        q: "In FCFS scheduling, the process that arrives first is:",
        options: ["Executed last", "Executed first", "Ignored", "Preempted"],
        answer: 1,
      },
      {
        q: "The main disadvantage of FCFS is:",
        options: ["Starvation", "Deadlock", "Convoy effect", "Preemption"],
        answer: 2,
      },
      {
        q: "SJF scheduling minimizes:",
        options: ["Turnaround time", "CPU utilization", "Average waiting time", "Response time"],
        answer: 2,
      },
      {
        q: "Which scheduling algorithm may cause starvation?",
        options: ["FCFS", "SJF", "Round Robin", "FIFO"],
        answer: 1,
      },
      {
        q: "Preemptive version of SJF is:",
        options: ["FCFS", "Priority", "Shortest Remaining Time First", "Round Robin"],
        answer: 2,
      },
      {
        q: "Round Robin scheduling uses:",
        options: ["Priority number", "Time quantum", "FIFO queue", "Semaphore"],
        answer: 1,
      },
      {
        q: "If the time quantum is very large in Round Robin, it behaves like:",
        options: ["SJF", "Priority", "FCFS", "LIFO"],
        answer: 2,
      },
      {
        q: "A race condition occurs when:",
        options: [
          "Two processes run slowly",
          "Multiple processes access shared data concurrently",
          "CPU is idle",
          "Deadlock occurs",
        ],
        answer: 1,
      },
      {
        q: "The critical section problem deals with:",
        options: ["CPU scheduling", "Memory allocation", "Process synchronization", "Disk management"],
        answer: 2,
      },
      {
        q: "Peterson's solution is used for:",
        options: [
          "Deadlock detection",
          "Mutual exclusion for two processes",
          "Paging",
          "Disk scheduling",
        ],
        answer: 1,
      },
      {
        q: "Which hardware instruction is used for synchronization?",
        options: ["MOV", "ADD", "Test-and-Set", "JMP"],
        answer: 2,
      },
      {
        q: "A mutex lock provides:",
        options: ["Multiprocessing", "Mutual exclusion", "Deadlock", "Swapping"],
        answer: 1,
      },
      {
        q: "A semaphore is:",
        options: [
          "Hardware device",
          "Integer variable used for synchronization",
          "Scheduling algorithm",
          "Disk block",
        ],
        answer: 1,
      },
      {
        q: "Binary semaphore is also called:",
        options: ["Counting semaphore", "Mutex", "Monitor", "Signal"],
        answer: 1,
      },
      {
        q: "A monitor provides:",
        options: [
          "Low-level synchronization",
          "High-level synchronization construct",
          "Disk management",
          "Paging",
        ],
        answer: 1,
      },
      {
        q: "Producer–Consumer problem is solved using:",
        options: ["Paging", "Semaphores", "Swapping", "Scheduling"],
        answer: 1,
      },
      {
        q: "Readers–Writers problem deals with:",
        options: ["CPU scheduling", "Memory allocation", "Shared database access", "Disk scheduling"],
        answer: 2,
      },
      {
        q: "Dining philosophers problem is an example of:",
        options: ["Scheduling", "Deadlock", "Paging", "Swapping"],
        answer: 1,
      },
      {
        q: "Deadlock occurs when ALL of these hold simultaneously:",
        options: [
          "CPU idle",
          "Mutual exclusion + hold and wait + no preemption + circular wait",
          "Only circular wait",
          "Only mutual exclusion",
        ],
        answer: 1,
      },
      {
        q: "Which is NOT a condition for deadlock?",
        options: ["Mutual exclusion", "Preemption allowed", "Circular wait", "Hold and wait"],
        answer: 1,
      },
      {
        q: "Banker's algorithm is used for:",
        options: ["Deadlock detection", "Deadlock avoidance", "Scheduling", "Paging"],
        answer: 1,
      },
      {
        q: "In Banker's algorithm, the system must remain in a:",
        options: ["Deadlock state", "Safe state", "Unsafe state", "Waiting state"],
        answer: 1,
      },
      {
        q: "Address space refers to:",
        options: ["Physical memory", "Logical memory of a process", "Disk blocks", "Cache"],
        answer: 1,
      },
      {
        q: "Logical address is generated by:",
        options: ["Memory", "CPU", "Disk", "Monitor"],
        answer: 1,
      },
      {
        q: "Swapping moves processes between:",
        options: ["Cache and CPU", "RAM and Disk", "Registers", "Stack and Heap"],
        answer: 1,
      },
      {
        q: "Fixed partition memory allocation suffers from:",
        options: ["External fragmentation", "Internal fragmentation", "No fragmentation", "Deadlock"],
        answer: 1,
      },
      {
        q: "Variable partition allocation suffers from:",
        options: ["Internal fragmentation", "External fragmentation", "No issue", "Deadlock"],
        answer: 1,
      },
      {
        q: "In segmentation, memory is divided based on:",
        options: ["Fixed size", "Logical units", "Equal blocks", "Random blocks"],
        answer: 1,
      },
      {
        q: "Page size in paging is:",
        options: ["Variable", "Fixed", "Infinite", "Dynamic"],
        answer: 1,
      },
      {
        q: "Paging eliminates:",
        options: [
          "Internal fragmentation",
          "External fragmentation",
          "Both fragmentations",
          "Segmentation",
        ],
        answer: 1,
      },
      {
        q: "Virtual memory allows:",
        options: [
          "Smaller memory usage",
          "Larger logical address space than physical memory",
          "No disk usage",
          "No swapping",
        ],
        answer: 1,
      },
      {
        q: "Demand paging loads pages:",
        options: ["At startup", "When required", "Never", "Randomly"],
        answer: 1,
      },
      {
        q: "Page fault occurs when:",
        options: ["Page is in memory", "Page is not in memory", "CPU idle", "Disk full"],
        answer: 1,
      },
      {
        q: "Thrashing occurs due to:",
        options: ["Excessive paging", "CPU overuse", "Disk formatting", "Scheduling"],
        answer: 0,
      },
      {
        q: "Magnetic disks use:",
        options: ["Flash memory", "Rotating platters", "RAM", "Registers"],
        answer: 1,
      },
      {
        q: "SSD is faster than HDD because:",
        options: ["It has moving parts", "No mechanical movement", "Larger size", "More sectors"],
        answer: 1,
      },
      {
        q: "SSTF disk scheduling selects the request with:",
        options: ["Highest priority", "Shortest seek time", "Longest seek", "FIFO order"],
        answer: 1,
      },
      {
        q: "SCAN disk scheduling is also called:",
        options: ["FIFO", "Elevator algorithm", "SSTF", "FCFS"],
        answer: 1,
      },
      {
        q: "Disk formatting prepares a disk for:",
        options: ["Scheduling", "Data storage", "Swapping", "Paging"],
        answer: 1,
      },
      {
        q: "If frame size is 4KB then a paging system with page table entry of 2 bytes can address _____ bytes of physical memory.",
        options: ["2^12", "2^16", "2^18", "2^28"],
        answer: 3,
        difficulty: "Hard",
      },
      {
        q: "Calculate the internal fragmentation if page size is 4KB and process size is 103KB.",
        options: ["3KB", "4KB", "1KB", "2KB"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "Which of the following scheduling policy is likely to improve interactiveness?",
        options: ["FCFS", "Round Robin", "Shortest Process Next", "Priority Based Scheduling"],
        answer: 1,
        difficulty: "Easy",
      },
      {
        q: "In a system using single processor, a new process arrives at the rate of 12 processes per minute and each such process requires 5 seconds of service time. What is the percentage of CPU utilization?",
        options: ["41.66", "100.00", "240.00", "60.00"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "A system has two processes and three identical resources. Each process needs a maximum of two resources. This could cause:",
        options: ["Deadlock is possible", "Deadlock is not possible", "Starvation may be present", "Thrashing"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "A disk has 400 cylinders (0–399). The disk arm is at cylinder 58 with pending requests for cylinders 66, 349, 201, 110, 38, 84, 226, 70, 86. Using SSTF, cylinder 86 is serviced after servicing _____ requests.",
        options: ["1", "2", "3", "4"],
        answer: 3,
        difficulty: "Hard",
      },
      {
        q: "Which of the following is true with regard to Round Robin scheduling technique?",
        options: ["Responds poorly to short process with small time quantum", "Works like SJF for larger time quantum", "Does not use a prior knowledge of burst times of processes", "Ensure that the ready queue is always of the same size"],
        answer: 2,
        difficulty: "Hard",
      },
    ],
  },

  // =====================================================================
  {
    title: "Module V",
    subject: "Digital Signal Processing",
    questions: [
      {
        q: "Which of the following is an example of an elementary signal?",
        options: ["Random signal", "Sinusoidal signal", "Noise signal", "Speech signal"],
        answer: 1,
      },
      {
        q: "A discrete-time signal is represented as:",
        options: ["x(t)", "x[n]", "x(s)", "x(ω)"],
        answer: 1,
      },
      {
        q: "A signal x[n] is classified as discrete-time because:",
        options: [
          "Discrete amplitude values",
          "Integer-valued independent variable",
          "Periodic nature",
          "Finite duration",
        ],
        answer: 1,
      },
      {
        q: "Process of converting a continuous-time signal into a discrete-time signal is:",
        options: ["Filtering", "Sampling", "Convolution", "Quantization"],
        answer: 1,
      },
      {
        q: "To avoid aliasing, the sampling frequency fs must satisfy:",
        options: ["fs < 2·fmax", "fs = fmax", "fs ≥ 2·fmax", "fs = 0"],
        answer: 2,
      },
      {
        q: "An analog signal is sampled at 8 kHz. Sampling period is:",
        options: ["0.125 ms", "8 ms", "125 μs", "1.25 ms"],
        answer: 0,
      },
      {
        q: "Which block converts an analog signal into a digital signal in a DSP system?",
        options: ["DAC", "ADC", "Filter", "FFT processor"],
        answer: 1,
      },
      {
        q: "Quantization noise is introduced during:",
        options: ["Sampling", "Filtering", "Quantization (ADC)", "Reconstruction"],
        answer: 2,
      },
      {
        q: "An LTI system has impulse response h(t). If x(t) = 3δ(t − 2), output y(t) is:",
        options: ["h(t − 2)", "3h(t)", "3h(t − 2)", "h(3t − 2)"],
        answer: 2,
      },
      {
        q: "A system is 'Linear' if it follows:",
        options: [
          "Inversion and Scaling",
          "Superposition and Homogeneity",
          "Causality and Stability",
          "Differentiation and Integration",
        ],
        answer: 1,
      },
      {
        q: "DFT stands for:",
        options: [
          "Digital Filter Transform",
          "Discrete Fourier Transform",
          "Dual Frequency Token",
          "Direct Fourier Technique",
        ],
        answer: 1,
      },
      {
        q: "An 8-point DFT computed directly requires approximately how many complex multiplications?",
        options: ["8", "32", "64", "128"],
        answer: 2,
      },
      {
        q: "Which property guarantees that signal energy in time domain equals energy in transform domain?",
        options: ["Linearity", "Time invariance", "Parseval's theorem", "Periodicity"],
        answer: 2,
      },
      {
        q: "The Twiddle factor WN in DFT is defined as:",
        options: ["e^(−j2π/N)", "e^(j2π/N)", "sin(2π/N)", "cos(2π/N)"],
        answer: 0,
      },
      {
        q: "Given X(k) = DFT{x(n)}, the IDFT is computed by:",
        options: [
          "Summation using the same exponential kernel",
          "Conjugation of X(k)",
          "Use of inverse exponential with scaling factor 1/N",
          "Time reversal of X(k)",
        ],
        answer: 2,
      },
      {
        q: "Two length-4 sequences convolved using a 4-point DFT (no zero padding) produces:",
        options: ["Linear convolution", "Circular convolution", "Aperiodic convolution", "Valid convolution"],
        answer: 1,
      },
      {
        q: "Circular convolution gives linear filtering when sequences are:",
        options: ["Padded with zeros", "Multiplied by a window", "Integrated", "Finite and equal to 1"],
        answer: 0,
      },
      {
        q: "Result of circular convolution of {1,1} and {1,1} is:",
        options: ["{1,1}", "{2,2}", "{1,2,1}", "{0,0}"],
        answer: 1,
      },
      {
        q: "Which methods are used for filtering long data sequences?",
        options: [
          "Radix-2 and Radix-4",
          "Overlap-save and Overlap-add",
          "Impulse Invariance and Bilinear",
          "DFT and IDFT",
        ],
        answer: 1,
      },
      {
        q: "A length-10000 sequence is filtered via FFT-based blocks. Overlap-Add/Save are used to:",
        options: [
          "Reduce quantization noise",
          "Efficiently perform linear convolution using FFT blocks",
          "Avoid spectral leakage",
          "Eliminate aliasing",
        ],
        answer: 1,
      },
      {
        q: "Radix-2 FFT reduces computational complexity of an N-point DFT from O(N²) to:",
        options: ["O(N)", "O(N log₂ N)", "O(log N)", "O(N³)"],
        answer: 1,
      },
      {
        q: "Radix-2 FFT algorithms require the number of samples to be:",
        options: ["Prime", "Odd", "Power of 2", "Even"],
        answer: 2,
      },
      {
        q: "In an 8-point Radix-2 FFT, how many stages of butterflies are required?",
        options: ["2", "3", "4", "8"],
        answer: 1,
      },
      {
        q: "In Decimation-in-Time (DIT) FFT, the input sequence is in:",
        options: [
          "Bit-reversed order",
          "Natural order",
          "Sorted by magnitude",
          "Shifted by N/2",
        ],
        answer: 0,
      },
      {
        q: "What is the primary characteristic of an IIR filter?",
        options: [
          "Finite number of non-zero terms",
          "Uses feedback (recursive)",
          "Impulse response always zero after 10 samples",
          "Always unstable",
        ],
        answer: 1,
      },
      {
        q: "Bilinear Transformation is used to design IIR filters by mapping:",
        options: [
          "s-plane to z-plane",
          "z-plane to time domain",
          "Analog frequencies to infinity",
          "Digital filters to FIR filters",
        ],
        answer: 0,
      },
      {
        q: "When using bilinear transformation, which effect must be compensated?",
        options: ["Time-domain aliasing", "Frequency warping", "Phase distortion", "Impulse truncation"],
        answer: 1,
      },
      {
        q: "Which structure directly implements the difference equation of a system?",
        options: ["Cascade form", "Parallel form", "Direct form", "Lattice form"],
        answer: 2,
      },
      {
        q: "Which realization is least sensitive to coefficient quantization for a high-order IIR filter?",
        options: ["Direct Form-I", "Direct Form-II", "Cascade of second-order sections", "Lattice FIR"],
        answer: 2,
      },
      {
        q: "An FIR filter has linear phase if its impulse response is:",
        options: ["Arbitrary", "Causal", "Symmetric or anti-symmetric", "Infinite"],
        answer: 2,
      },
      {
        q: "Linear phase response is characteristic of which filter type?",
        options: ["IIR Filter", "FIR Filter", "All-pass Filter", "Butterworth Filter"],
        answer: 1,
      },
      {
        q: "FIR filter h[n] = {1, 2, 3, 2, 1} exhibits:",
        options: ["Nonlinear phase", "Minimum phase", "Linear phase", "Zero phase"],
        answer: 2,
      },
      {
        q: "Which FIR design technique is based on truncation of the ideal impulse response?",
        options: ["Frequency sampling", "Window method", "Parks–McClellan", "Least squares"],
        answer: 1,
      },
      {
        q: "Which window provides the narrowest main lobe?",
        options: ["Rectangular window", "Hamming window", "Hanning window", "Blackman window"],
        answer: 0,
      },
      {
        q: "If an FIR window length is doubled, the most significant effect is:",
        options: [
          "Increased passband ripple",
          "Wider transition band",
          "Narrower transition band",
          "Increased quantization noise",
        ],
        answer: 2,
      },
      {
        q: "Harvard architecture separates:",
        options: ["CPU and ALU", "Program and data memory", "Cache and RAM", "Input and output"],
        answer: 1,
      },
      {
        q: "Due to Harvard architecture, in a single clock cycle a DSP can perform:",
        options: [
          "Two data fetches simultaneously",
          "Instruction fetch and data fetch simultaneously",
          "Two instructions executed simultaneously",
          "Parallel ALU operations only",
        ],
        answer: 1,
      },
      {
        q: "MAC stands for:",
        options: [
          "Memory Access Control",
          "Multiply-Accumulate",
          "Message Authentication Code",
          "Micro-Address Counter",
        ],
        answer: 1,
      },
      {
        q: "Σ x[n]·h[n] is most efficiently computed by which DSP hardware?",
        options: ["Shifter", "Comparator", "Multiply-Accumulate (MAC) unit", "Address generation unit"],
        answer: 2,
      },
      {
        q: "A 5-stage DSP pipeline (10 ns/stage) takes how long to complete 10 instructions (ignoring overhead)?",
        options: ["100 ns", "140 ns", "500 ns", "50 ns"],
        answer: 1,
      },
      {
        q: "TMS320C67xx is an example of:",
        options: ["8-bit Microcontroller", "Floating-point DSP", "Fixed-point only Processor", "FPGA"],
        answer: 1,
      },
      {
        q: "Q15 fixed-point format max positive value is approximately:",
        options: ["0.99997", "1", "32767", "1.999"],
        answer: 0,
      },
      {
        q: "Switching from floating-point to fixed-point makes which design requirement critical?",
        options: [
          "Instruction pipelining",
          "Scaling and overflow management",
          "Cache coherence",
          "Interrupt latency",
        ],
        answer: 1,
      },
      {
        q: "Finite word length effects in IIR filters can cause:",
        options: ["Limit cycle oscillations", "Linear phase", "Stability improvement", "Reduced noise"],
        answer: 0,
      },
      {
        q: "An IIR filter with zero input shows constant non-zero output. This is:",
        options: ["Overflow oscillation", "Limit cycle oscillation", "Aliasing", "Quantization noise"],
        answer: 1,
      },
      {
        q: "An IIR filter becomes unstable after coefficient quantization due to:",
        options: ["Round-off noise", "Pole displacement", "Window leakage", "Spectral folding"],
        answer: 1,
      },
      {
        q: "The computational procedure for Decimation in Frequency algorithm takes:",
        options: ["log₂N stages", "2·log₂N stages", "log₂N² stages", "log₂(N/2) stages"],
        answer: 0,
        difficulty: "Hard",
      },
      {
        q: "The region of convergence of x/(1+2x+x²) is:",
        options: ["0", "1", "Negative", "Positive"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "A signal x[n] is anti-symmetric or odd when:",
        options: ["x[−n] = x[n]·x[n]", "x[n] = −x[n]", "x[n] = [x[n]]²", "x[−n] = −x[n]"],
        answer: 3,
        difficulty: "Easy",
      },
      {
        q: "For the calculation of N-point DFT, Radix-2 FFT algorithm requires approximately:",
        options: ["2N·log₂N² computations", "(N·log₂N)²/2 computations", "(N·log₂N)/2 computations", "(N·log₂2N)/2 computations"],
        answer: 2,
        difficulty: "Hard",
      },
      {
        q: "The scaling of a sequence x[n] by a factor α is given by:",
        options: ["y[n] = α·[x[n]]²", "y[n] = α·x[n²]", "y[n] = α·x[n]", "y[n] = x[n]·x[−n]"],
        answer: 2,
        difficulty: "Easy",
      },
      {
        q: "In cascade form of realization, how many bits should be used to represent the FIR filter coefficients to avoid the quantization effect?",
        options: ["5 to 10", "12 to 14", "20 to 24", "28 to 40"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "The impulse response of a continuous time system is h(t) = δ(t−1) + δ(t−3). The value of the step response at t = 2 is:",
        options: ["0", "1", "2", "3"],
        answer: 1,
        difficulty: "Hard",
      },
      {
        q: "A 1 kHz sinusoidal signal is ideally sampled at 1500 samples/sec and the sampled signal is passed through an ideal low-pass filter with cut-off frequency 800 Hz. The output signal has the frequency:",
        options: ["0 Hz", "0.75 kHz", "0.5 kHz", "0.25 kHz"],
        answer: 2,
        difficulty: "Hard",
      },
    ],
  },
]
