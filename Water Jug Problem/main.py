jugs = []
while True:
    size = int(input())
    if size == 0:
        break
    jugs.append(size)

numberOfJugs = len(jugs)


queue = [tuple(0 for i in range(numberOfJugs))]

finishedStates = set()
parents = {tuple(0 for i in range(numberOfJugs)):None}

target = tuple(map(int,input().split()))

while len(queue) > 0:
    curr = queue[0]
    queue = queue[1:]
    
    if curr in finishedStates:
        continue
    
    #print(curr)

    if curr == target:
        break
    
    finishedStates.add(curr)

    #All jugs can be filled fully
    for i in range(numberOfJugs):
        ns = [curr[j] for j in range(numberOfJugs)]
        ns[i] = jugs[i] #Filling to maximum capacity
        ns = tuple(ns)
        queue.append(ns)
        if ns not in parents.keys():
            parents[ns] = curr
    
    #All jugs can be emptied
    for i in range(numberOfJugs):
        ns = [curr[j] for j in range(numberOfJugs)]
        ns[i] = 0 #Filling to maximum capacity
        ns = tuple(ns)
        queue.append(ns)
        if ns not in parents.keys():
            parents[ns] = curr
    
    #Pick any 2 jugs and pour from first to second

    for firstJug in range(numberOfJugs):
        for secondJug in range(numberOfJugs):
            if firstJug != secondJug:
                ns = [curr[j] for j in range(numberOfJugs)]
                qty = min(curr[firstJug],jugs[secondJug]-curr[secondJug]) #We can either pour until first jug is empty or second jug is full
                ns[firstJug] -= qty
                ns[secondJug] += qty
                ns = tuple(ns)
                queue.append(ns)
                if ns not in parents.keys():
                    parents[ns] = curr

curr = target
path = ''
while curr != None:
    path = str(curr) + ' -> ' + path
    curr = parents[curr]

print(path)