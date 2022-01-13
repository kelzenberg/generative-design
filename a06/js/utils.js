// eslint-disable-next-line no-unused-vars
function findProjection(start, future, end) {
  const v1 = p5.Vector.sub(future, start);
  const v2 = p5.Vector.sub(end, start).normalize();
  const scalarProjection = v1.dot(v2);
  v2.mult(scalarProjection).add(start);
  return v2;
}
