var plantLibrary = [
  {
    name: "original",
    axiom: "F",
    angle: 25,
    rules: [
        { a: "F", b: "FF", weight: 0.3 },
        { a: "F", b: "F[+F]F", weight: 0.1 },
        { a: "F", b: "FF-[-F+FC]+[+F-FC]", weight: 0.4},
        { a: "F", b: "FF-[-F+F+FC]+[+F-F-FC]",  weight: 0.2 }
    ]
  },
  {
    name: "abop-a",
    axiom: "F",
    angle: 25.7,
    rules: [
        { a: "F", b: "F[+F]F[-F]F", weight: 1 },
    ]
  },
  {
    name: "abop-b",
    axiom: "F",
    angle: 20,
    rules: [
        { a: "F", b: "F[+FC]F[-F][FC]", weight: 1 },
    ]
  },
  {
    name: "abop-cl",
    axiom: "F",
    angle: 22.5,
    rules: [
        { a: "F", b: "FF-[-F+F+F]+[+F-F-F]", weight: 1 },
    ]
  },
  {
    name: "abop-d",
    axiom: "C",
    angle: 20,
    rules: [
        { a: "C", b: "F[+C]F[-C]+C", weight: 1 },
        { a: "F", b: "F", weight: 1 },
    ]
  },
];