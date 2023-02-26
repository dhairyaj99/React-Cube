import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const Axis = ({ start, end, type }) => {
  const lineRef = useRef < THREE.Line > null;
  useFrame(() => {
    if (!lineRef) {
      return;
    }
  });

  var lineColor;
  switch (type) {
    case "x":
      lineColor = "blue";
      break;
    case "y":
      lineColor = "red";
      break;
    case "z":
      lineColor = "green";
      break;
    default:
      lineColor = "white";
      break;
  }

  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(end.x, end.y, end.z),
  ];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 100,
    linecap: "round",
    linejoin: "round",
  });

  return (
    <line useRef={lineRef} geometry={lineGeometry} material={lineMaterial} />
  );
};

export default Axis;
