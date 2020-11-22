

//Revisit when: Ordered Map is implemented

// Ok, so we re left at the point where we have to tackle problems where
// the slope is not ascending/ descending
// or when the queries are not ascending/ descending.
// just like the problem Product Sum\
// the slope is arbitrarily given, and it produces wrong results on CF, because it is wrong to assume that Q[0] is the best choice, as the slopes arent sorted

// This is called Fully Dynamic version of CHT:
// The lines are inserted in arbitrary order of slope
// The query positions are in arbitrary order

// And it builds upon an Ordered set to make it work. First explore treesets and then revisit this.
-------------------------------
// As for the problems so far:
// normal CHT can be applied when : 
//  Slopes are sorted and:
//      Queries are sorted: Normal stuff O(N)
//      Queries are not sorted: Binary Search their corresponding Line




// https://codeforces.com/blog/entry/63823?#comment-477568


//http://web.archive.org/web/20181030143808/http://wcipeg.com/wiki/Convex_hull_trick#Fully_dynamic_variant

/* Concept for dynamic : 

    Ok, so the difference here is that slopes arent sorted, so we re gonna keep a dynamic set where:
        the lines are sorted by slope
        the useless lines are removed on every insertion of a new line

    How are the useless lines removed?
    
    On every insertion, the newly inserted line l1 has to take its position
    inside the Ordered set
    Let's assume this is holds after the insertion

            OrderedSet=[...a,b,c,l1,d,e,f...]
    
    The potential useless lines to be removed are always adjacent to l1
    and the usual criteria holds where:
        
        while IntersectionX(l1,b)< IntersectionX(b,c)
            remove c
        
        while IntersectionX(l1,e)< IntersectionX(d,e)
            remove d
        

*/

//dynamic implementations in cpp
https://github.com/kth-competitive-programming/kactl/blob/master/content/data-structures/LineContainer.h
https://github.com/RezwanArefin01/CodeTemplate/blob/master/ConvexHullTrick%20(Dynamic%20Online).cpp


//This fella uses a dynamic variant abstraction,
// after the implementation of an ordered set with logn removals, do these 
//next problems: 
https://robert1003.github.io/2020/02/17/dp-opt-convex-hull-trick.html