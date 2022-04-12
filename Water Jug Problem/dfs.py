jugs = []
while True:
    size = int(input())
    if size == 0:
        break
    jugs.append(size)

numberOfJugs = len(jugs)


stack = [tuple(0 for i in range(numberOfJugs))]

dist = {tuple(0 for i in range(numberOfJugs)): 0}
parents = {tuple(0 for i in range(numberOfJugs)): None}

target = tuple(map(int, input().split()))

while len(stack) > 0:
    curr = stack[-1]
    stack = stack[:-1]

    # print(curr)

    # All jugs can be filled fully
    for i in range(numberOfJugs):
        ns = [curr[j] for j in range(numberOfJugs)]
        ns[i] = jugs[i]  # Filling to maximum capacity
        ns = tuple(ns)
        if ns not in parents.keys() or dist[curr] + 1 < dist[ns]:
            parents[ns] = curr
            dist[ns] = dist[curr] + 1
            stack.append(ns)

    # All jugs can be emptied
    for i in range(numberOfJugs):
        ns = [curr[j] for j in range(numberOfJugs)]
        ns[i] = 0  # Filling to maximum capacity
        ns = tuple(ns)
        if ns not in parents.keys() or dist[curr] + 1 < dist[ns]:
            parents[ns] = curr
            dist[ns] = dist[curr] + 1
            stack.append(ns)

    # Pick any 2 jugs and pour from first to second

    for firstJug in range(numberOfJugs):
        for secondJug in range(numberOfJugs):
            if firstJug != secondJug:
                ns = [curr[j] for j in range(numberOfJugs)]
                # We can either pour until first jug is empty or second jug is full
                qty = min(curr[firstJug], jugs[secondJug]-curr[secondJug])
                ns[firstJug] -= qty
                ns[secondJug] += qty
                ns = tuple(ns)
                if ns not in parents.keys() or dist[curr] + 1 < dist[ns]:
                    parents[ns] = curr
                    dist[ns] = dist[curr] + 1
                    stack.append(ns)
curr = target
path = ''
while curr != None:
    path = str(curr) + ' -> ' + path
    curr = parents[curr]

print(path)
