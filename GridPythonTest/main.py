start = ((8,2,6),(0,3,4),(1,5,7))

queue = [start]

finishedStates = set()
parents = {start:None}

target = ((1,2,3),(4,5,6),(7,8,0))

while len(queue) > 0:
    curr = queue[0]
    queue = queue[1:]
    
    if curr in finishedStates:
        continue

    if curr == target:
        break
    
    finishedStates.add(curr)

    holerow,holecol = 0,0
    for i in range(3):
        for j in range(3):
            if curr[i][j] == 0:
                holerow,holecol = i,j
    
    children = [(holerow-1,holecol),(holerow,holecol-1),(holerow+1,holecol),(holerow,holecol+1)]

    for child in children:
        if child[0] >= 0 and child[0] < 3 and child[1] >= 0 and child[1] < 3:
            ns = [[curr[i][j] for j in range(3)] for i in range(3)]
            ns[holerow][holecol],ns[child[0]][child[1]] = ns[child[0]][child[1]],ns[holerow][holecol]
            ns = tuple(tuple(ns[i][j] for j in range(3)) for i in range(3))
            queue.append(ns)
            if ns not in parents.keys():
                parents[ns] = curr

curr = target
path = ''
while curr != None:
    path = str(curr) + ' -> ' + path
    curr = parents[curr]

print(path)