// There is a room with n bulbs, numbered from 1 to n, arranged in a row from left to right. Initially, all the bulbs are turned off.

// At moment k (for k from 0 to n - 1), we turn on the light[k] bulb. A bulb change color to blue only if it is on and all the previous bulbs (to the left) are turned on too.

// Return the number of moments in which all turned on bulbs are blue.



// The key concept is maintaining two Sets, inside the set 'left' I will store all the indexes that I'm expecting, whereas inside 'extra' I will store all the ones I'm given. During my for loop, if both my sets are empty that means that my Happy path where I m expecting nothing and nothing is extra is happening. If my sets are not empty then either I have some extra switched bulbs or a necessary one that I have yet to switch.

	var numTimesAllBlue = function(L) {
		let result=0
		let left=new Set()

		let extra=new Set()

		for (let i = 0; i < L.length; i++) {
			let curr=i+1

			if(left.has(L[i]))left.delete(L[i])
			else{
				extra.add(L[i])

			}
			if(extra.has(curr))extra.delete(curr)
			else{
				left.add(curr)

			}

			if(left.size===extra.size && extra.size===0)result++
		}

		return result
	};