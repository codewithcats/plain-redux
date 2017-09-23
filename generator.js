({
    babel: true
})

function* generator() {
  const x = yield 'x'
  console.log('x was assigned')
  const y = yield 'y'
  console.log('y was assigned')
}

const gen = generator()

console.log(gen)
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
