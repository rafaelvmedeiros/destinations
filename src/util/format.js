const { format } = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatToBRL(money) {
  return format(money);
}

export function formatWithoutBRL(money) {
  return format(money).replace("R$", "");
}
