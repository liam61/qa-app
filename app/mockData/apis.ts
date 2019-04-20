export async function getGoods() {
  await wait();
  const random = Math.random().toFixed(3);
  return {
    id: random,
    name: `goods-${random}`,
    desc: `desc-${random}`
  }
}

export function wait(delay = 500) {
  return new Promise(r => setTimeout(r, delay));
}
