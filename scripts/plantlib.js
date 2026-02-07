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
    name: "ai plant ew",
    axiom: "F",
    angle: 25,
    rules: [
      { a: "F", b: "F[+F]F[-F]", weight: 0.4 },
      { a: "F", b: "FF", weight: 0.6 }
    ]
  },
  {
    name: "ai flower ew",
    axiom: "F",
    angle: 25,
    rules: [
      { a: "F", b: "FF+[+FC]-[-FC]", weight: 0.5 },
      { a: "F", b: "F[+F]F", weight: 0.5 }
    ]
  }
];