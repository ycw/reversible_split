console.groupCollapsed("quick_test")

console.log('split by regexp')
{
  let str = "a : b ::c::d::e"
  let sep = /\s*(:+)(\s*)/
  let n = 3
  let xs = str.split(new String.SplitN(sep, n))

  console.assert(xs.length === 3)
  console.assert(xs[0] === "a")
  console.assert(xs[1] === "b")
  console.assert(xs[2] === "c::d::e")

  console.assert(xs.separators.length === 2)
  console.assert(xs.separators[0] === " : ") // fullmatch btwn a and b
  console.assert(xs.separators[1] === " ::") // fullmatch btwn b and c

  console.assert(xs.groups.length === 4)
  console.assert(xs.groups[0] === ":")  // match#0 captured group#0
  console.assert(xs.groups[1] === " ")  // match#0 captured group#1
  console.assert(xs.groups[2] === "::") // match#1 captured group#0
  console.assert(xs.groups[3] === "")   // match#1 captured group#1

  let str2 = xs.join(xs.separators)
  console.assert(str === str2)

  console.log("passed", xs)
}


console.log('split by str')
{
  let str = "a : b ::c::d::e"
  let sep = ":"
  let n = 3
  let xs = str.split(new String.SplitN(sep, n))

  console.assert(xs.length === 3)
  console.assert(xs[0] === "a ")
  console.assert(xs[1] === " b ")
  console.assert(xs[2] === ":c::d::e")

  console.assert(xs.separators.length === 2)
  console.assert(xs.separators[0] === ":")
  console.assert(xs.separators[1] === ":")

  console.assert(xs.groups.length === 0)

  let str2 = xs.join(xs.separators)
  console.assert(str === str2)

  console.log("passed", xs)
}


console.log('split by empty str')
{
  let str = "a : b ::c::d::e"
  let sep = ""
  let n = 3
  let xs = str.split(new String.SplitN(sep, n))

  console.assert(xs.length === 3)
  console.assert(xs[0] === "a")
  console.assert(xs[1] === " ")
  console.assert(xs[2] === ": b ::c::d::e")

  console.assert(xs.separators.length === 2)
  console.assert(xs.separators[0] === "")
  console.assert(xs.separators[1] === "")

  console.assert(xs.groups.length === 0)

  let str2 = xs.join(xs.separators)
  console.assert(str === str2)

  console.log("passed", xs)
}


console.log('n = 0 should throw')
{
  let str = ""
  let sep = ""
  let n = 0

  try {
    let items = str.split(new String.SplitN(sep, n))
    console.error("fail") // unreachable 
  } catch (e) {
    console.assert(e instanceof RangeError)
    console.log("passed", `(caught: ${e.message})`)
  }
}

console.groupEnd("quick_test");