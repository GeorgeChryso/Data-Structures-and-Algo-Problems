
// Sort a linked list in O(n log n) time using constant space complexity.

//insertion sort
var sortList = function(head) {
    if(head==null)return null

    let n=head;
    while(n!=null){
        if(n.next)n.next.prev=n
        n=n.next
    }

    let start=head.next
    while(start!=null){
        let key=start.val

        let q=start.prev
        while(q!=null&&q.val>key){
            q.next.val=q.val
            q=q.prev
        }

        if(q==null){
            head.val=key
        }
        else q.next.val=key

        start=start.next
    }   
    return head

};

//insertion sort without prev (slow)
var sortList = function(head) {
    if(head==null||head.next==null)return head
    
    class ListNode{
        constructor(val){
            this.next=null
            this.val=val
        }

    }

    let dummy = new ListNode(0)
    let prev=dummy
    let curr=head
    let next=null

    while(curr != null){
        next = curr.next;
        while(prev.next != null && prev.next.val < curr.val){
            prev = prev.next;
        }
        curr.next = prev.next;
        prev.next = curr;
        curr = next;
        prev = dummy;
    }
    return  dummy.next;

};


//simple merge sort
var sortList = function(head) {
    if (head === null || head.next === null) {
        return head;
    }
    /**
     * The goal is to use merge sort on the linked list. 
     * We need to split the list into two and merge them in the ascending order 
     * recursively.
     */
    const [left, right] = split(head);
    // use a temparary node to link all the sorted nodes
    const root = new ListNode(null);
    return merge(root, sortList(left), sortList(right))
};

function split(node) {
    let slow = node;
    let fast = node;
    // use fast & slow pointer to find the middle node so that 
    // we can split the list into list[0 -> slow] & list[slow + 1 -> list.size]
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    const left = node;
    const right = slow.next;
    // break off the list so that `left` doesn't link to `right`
    slow.next = null;
    
    return [left, right];
}

function merge(root, left, right) {
    let pointer = root;
    /**
     * merge the smaller node in the `left` and `right` list first.
     * return the second node in the list because the first is a 
     * temparary node.
     */
    while(left !== null || right !== null) {
        if (left === null) {
            pointer.next = right;
            right = right.next;
        } else if (right === null) {
            pointer.next = left;
            left = left.next;
        } else {
            if (left.val < right.val) {
                pointer.next = left;
                left = left.next;
            } else {
                pointer.next = right;
                right = right.next;
            }
        }
        pointer = pointer.next;
    }

    return root.next;
}
// bottom up-mergesort
function sortList(h) {
    if (h === null || h.next === null) return h
    const [l, r] = split(h)
    return merge(new ListNode, sortList(l), sortList(r))
  }
  
  function split(node) {
    let l = node, r = node
    while (r.next && r.next.next) {
      l = l.next
      r = r.next.next
    }
    const left = node, right = l.next
    l.next = null
    return [left, right]
  }
  
  function merge(root, l, r) {
    let node = root
    while (l !== null || r !== null) {
      if (l === null) {
        node.next = r
        r = r.next
      } else if (r === null) {
        node.next = l
        l = l.next
      } else {
        if (l.val < r.val) {
          node.next = l
          l = l.next
        } else {
          node.next = r
          r = r.next
        }
      }
      node = node.next
    }
    return root.next
  }


//  4->2->1->3->5->6

//  4->2
//       1->3   
//             5->6


// 1->2->3->4  
//            5->6
// 1->2->3->4->5->6
          