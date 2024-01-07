let Heap = require('heap')

const CORE_I4_PRODUCT_NAME = 'Core i4';
const CORE_I5_PRODUCT_NAME = 'Core i5';
const NUM_GRIDS = 4;
const RU_PER_GRID = 20;

class Node {
  constructor(product, origCount, currCount) {
    this.product = product;
    this.origCount = origCount;
    this.currCount = currCount;
  }

  compareTo(other) {
    // Tiebreaker case: If Current counts are equal, then use original count as the tiebreaker
    if (this.currCount === other.currCount) {
      return this.origCount > other.origCount ? 1 : -1;
    }
    // Normal case: Higher current count means that Node is considered for filling into floorplan
    return this.currCount > other.currCount ? 1 : -1;
  }
}

// function extractJsonData(path) {
//   let rawData = fs.readFileSync(path);
//   return JSON.parse(rawData);
// }

function generateEmptyFloorplan(rows, cols) {
  let floorplan = Array.from({ length: rows }, () => Array(cols).fill(0));
  return floorplan;
}

function convertJsonToNodeList(data) {
  let nodeArray = [];
  let coreI4 = null;
  let coreI5 = null;
  for (let item of data) {
    let product = item.product;
    let origCount = item.repeat;
    let currCount = origCount;
    let node = new Node(product, origCount, currCount);
    if (node.product === CORE_I4_PRODUCT_NAME) {
      coreI4 = node;
    } else if (node.product === CORE_I5_PRODUCT_NAME) {
      coreI5 = node;
    } else {
      nodeArray.push(node);
    }
  }
  return [nodeArray, coreI4, coreI5];
}

function placeI4I5Products(coreI4, coreI5, floorplan) {
  let rows = NUM_GRIDS;
  let cols = RU_PER_GRID;
  let listCores = [coreI4, coreI5];
  let toggle = 0;
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      if (listCores[toggle].origCount !== 0) {
        floorplan[i][j] = listCores[toggle].product;
        listCores[toggle].origCount -= 1;
      }
    }
    toggle = toggle === 0 ? 1 : 0;
  }
  return floorplan;
}

function createInitialMaxHeapFromNodeList(nodeList) {
  let maxHeap = new Heap(function(a, b) {
        return b.currCount - a.currCount; // reversed to get maxHeap
    });
  for (let node of nodeList) {
    maxHeap.push(node);
  }
  maxHeap.heapify()
  return maxHeap;
}

function populateFloorplan(floorplan, nodeList, maxHeap) {
  let leftNode = null;
  const rows = NUM_GRIDS;
  const cols = RU_PER_GRID;
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      if (j !== 0) {
        leftNode = floorplan[i][j - 1];
      }
      if (floorplan[i][j] === 0) {
        let maxNode = maxHeap.pop();
        if (j !== 0) {
          if (leftNode !== maxNode.product && maxNode.currCount !== 0) {
            floorplan[i][j] = maxNode.product;
            maxNode.currCount -= 1;
          } else if (leftNode === maxNode.product && maxNode.currCount !== 0) {
            let maxNode2 = maxHeap.pop();
            if (leftNode !== maxNode2.product && maxNode2.currCount !== 0) {
              floorplan[i][j] = maxNode2.product;
              maxNode2.currCount -= 1;
            }
            maxHeap.push(maxNode2);
          }
        } else {
          if (maxNode.currCount !== 0) {
            floorplan[i][j] = maxNode.product;
            maxNode.currCount -= 1;
          }
        }
        maxHeap.push(maxNode);
      }
    }
  }
  return floorplan;
}

// Driver code
export function generateCompletedFloorplan(jsonData) {
    let floorplan = generateEmptyFloorplan(NUM_GRIDS, RU_PER_GRID);
    // let [nodeList, coreI4, coreI5] = convertJsonToNodeList(extractJsonData(PATH));
    let [nodeList, coreI4, coreI5] = convertJsonToNodeList(jsonData);
    floorplan = placeI4I5Products(coreI4, coreI5, floorplan)
    let maxHeap = createInitialMaxHeapFromNodeList(nodeList);
    let finalFloorplan = populateFloorplan(floorplan, nodeList, maxHeap);

    for (const grid of finalFloorplan) {
        console.log(grid.join(' '));
    }

    return finalFloorplan;
}