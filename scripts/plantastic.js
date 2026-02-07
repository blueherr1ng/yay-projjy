var plantLibrary = [
  {
    name: "original",
    axioms: ["F[+F][-F]", "F", "F[F][F]", "F[+F]F[-F]"],
    rules: [
        { a: "F", b: "FF", weight: 0.3 },
        { a: "F", b: "F[+F]F", weight: 0.1 },
        { a: "F", b: "FF-[-F+FC]+[+F-FC]", weight: 0.4},
        { a: "F", b: "FF-[-F+F+FC]+[+F-F-FC]",  weight: 0.2 }
    ]
  },
  {
    name: "ai plant ew",
    axioms: ["F", "F[F]"],
    rules: [
      { a: "F", b: "F[+F]F[-F]", weight: 0.4 },
      { a: "F", b: "FF", weight: 0.6 }
    ]
  },
  {
    name: "ai flower ew",
    axioms: ["F[+FC][-FC]"],
    rules: [
      { a: "F", b: "FF+[+FC]-[-FC]", weight: 0.5 },
      { a: "F", b: "F[+F]F", weight: 0.5 }
    ]
  }
];