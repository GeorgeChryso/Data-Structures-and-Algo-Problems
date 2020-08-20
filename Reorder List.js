// Given a singly linked list L: L0→L1→…→Ln-1→Ln,
// reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

// You may not modify the values in the list's nodes, only nodes itself may be changed.




var reorderList = function (head) {
    let q = [], node = head
    if (!node) return
    //push all the nodes in a q
    while (node) {
      q.push(node)
      node = node.next
    }
  
    let len = q.length
    node = head
    for (let i = 0; i < len; i++) {
      //take one from the beginning
      if (i % 2 === 0)
        node.next = q.shift()
      //and one from the end
      else
        node.next = q.pop()
      node = node.next
    }
    // dont forget to set the last node's next to null
    node.next = null 
  };