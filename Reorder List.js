// Given a singly linked list L: L0→L1→…→Ln-1→Ln,
// reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

// You may not modify the values in the list's nodes, only nodes itself may be changed.




var reorderList = function (head) {
    let stack = [], node = head
    if (!node) return
    while (node) {
      stack.push(node)
      node = node.next
    }
  
    let len = stack.length
    node = head
    for (let i = 0; i < len; i++) {
      if (i % 2 === 0)
        node.next = stack.shift()
      else
        node.next = stack.pop()
      node = node.next
    }
    node.next = null
  };