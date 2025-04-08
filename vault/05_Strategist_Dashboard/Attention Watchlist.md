```dataview
table Confidence, Status, Due, Owner
from "03_Tasks"
where Confidence < 0.7 and Status != "Completed"
sort Due asc
```
