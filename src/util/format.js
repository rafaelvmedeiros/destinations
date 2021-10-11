const { format: formatBRL } = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function format(money) {
  return formatBRL(money);
}
