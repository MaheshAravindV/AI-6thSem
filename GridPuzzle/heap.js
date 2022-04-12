export function BinaryHeap(comp = (x) => x) {
  //comp is the custom function by which comparison happens and defaults to the value if it is not given
  let list = [];
  this.comp = comp;
  //Heapify
  this.minHeapify = (arr, n, i) => {
    let smallest = i;
    let l = 2 * i + 1; //left child index
    let r = 2 * i + 2; //right child index

    //If left child is smaller than root
    if (l < n && comp(arr[l]) < comp(arr[smallest])) {
      smallest = l;
    }

    // If right child is smaller than smallest so far
    if (r < n && comp(arr[r]) < comp(arr[smallest])) {
      smallest = r;
    }

    // If smallest is not root
    if (smallest != i) {
      let temp = arr[i];
      arr[i] = arr[smallest];
      arr[smallest] = temp;

      // Recursively heapify the affected sub-tree
      this.minHeapify(arr, n, smallest);
    }
  };

  //Insert Value
  this.insert = (num) => {
    const size = list.length;

    if (size === 0) {
      list.push(num);
    } else {
      list.push(num);

      //Heapify
      for (let i = parseInt(list.length / 2 - 1); i >= 0; i--) {
        this.minHeapify(list, list.length, i);
      }
    }
  };

  //Remove value
  this.delete = (num) => {
    const size = list.length;

    //Get the index of the number to be removed
    let i;
    for (i = 0; i < size; i++) {
      if (list[i] === num) {
        break;
      }
    }

    //Swap the number with last element
    [list[i], list[size - 1]] = [list[size - 1], list[i]];

    //Remove the last element
    list.splice(size - 1);

    //Heapify the list again
    for (let i = parseInt(list.length / 2 - 1); i >= 0; i--) {
      this.minHeapify(list, list.length, i);
    }
  };

  //Return min value
  this.findMin = () => list[0];

  //Remove min val
  this.deleteMin = () => {
    this.delete(list[0]);
  };

  //Remove and return min value
  this.extractMin = () => {
    const min = list[0];
    this.delete(min);
    return min;
  };

  //Size
  this.size = () => list.length;

  //IsEmpty
  this.isEmpty = () => list.length === 0;

  //Return head
  this.getList = () => list;
}
