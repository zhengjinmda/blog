## VBA
1. Application 对象，表示 Excel 应用程序。
2. Workbook 对象，表示工作簿对象。
3. Worksheet 对象，表示工作表对象
4. Range 对象，表示单元格区域对象。
5. Cells 对象，一个表格。

### 变量
```vb
Dim name as type
'eg
Dim helloWorld as String
Dim age as Integer
age = 23
Range("A1") = age
```

```vb
Sub myCircle()
  Const PI As Integer = 3.1415926
  Dim r As Integer
  Dim c As Integer
  '从A1单元格读取半径
  r = Range("A1").Value
  MsgBox "半径为：" & r
  c = 2 * PI * r
  '将周长赋值给单元格A2
  Range("A2").Value = c
  MsgBox "周长为：" & c
  
End Sub
```

### 循环语句
```vb
Sub myCode()
Dim i As Intereger
Dim isBlank As Boolean
For i = 2 To 10
    isBlank = Cells(i, 1).value = ""
    If isBlank Then
    Cells(i, 1) = Cells(i - 1, 1)
    End If
Next i
End Sub
```