import csv
import json

names = []
links = []

with open('data.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter =',')
    ctr = 0
    for row in csv_reader:
        if ctr == 0:
            index = 0
            for col in row:
                names.append({"id": index, "name": col})
                index += 1
            ctr += 1
        else:
            # Set source as the first one and target to all that come after (iterate through row twice)
            source_index = -1
            for src_col in row:
                # Pass the group name + total number of people
                source_index += 1
                if source_index == 0 or source_index == 1:
                    pass
                else:
                    if src_col == "0":
                        pass
                    elif src_col == "1":
                        target_index = source_index + 1
                        while target_index < 10:
                            if row[target_index] == "0":
                                pass
                            elif row[target_index] == "1":
                                links.append({"source": source_index, "target": target_index})
                            else:
                                print("bad target data")
                            target_index += 1
                    else:
                        print("this data is not clean" + src_col)
            ctr += 1

jObject = {"nodes": names, "links": links}
obj = print(json.dumps(jObject))



# Make dict of node names
# Make dict of source and target
# Make those two into JSOON object