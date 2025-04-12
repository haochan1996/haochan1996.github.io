---
siderbar: 1
---

## hello go

最简单的`go`程序。

```go
package main // 程序的包名

import (
	"fmt"
	"time"
)

// main函数
func main() { //函数的{一定和函数名在同一行，否则编译不通过
	// golang中的表达式，加";"和不加都可以，建议不加
	fmt.Print("hello golang!")

	time.Sleep(1 * time.Second)
}
```