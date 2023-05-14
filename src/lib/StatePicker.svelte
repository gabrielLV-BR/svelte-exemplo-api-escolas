<script lang="ts">
  import CustomPicker from "./CustomPicker.svelte";

  import {
    getEstados,
    type Estado,
    getURLBandeira,
    ordenarEstados,
  } from "../api/estados";

  export let estado: Estado = null;
  export let setEstado: (e: Estado) => void = () => {};

  let estados: Estado[] = [];

  getEstados()
    .then((e) => (estados = e.sort(ordenarEstados)))
    .catch(() => alert("Erro ao carregar os estados"));

  const getValueTitle = (e: Estado) => e.nome;
  const getImageFromValue = (e: Estado) => {
    return {
      src: getURLBandeira(e.sigla),
      alt: `Bandeira de ${e.nome}`,
    };
  };
</script>

<CustomPicker
  value={estado}
  setValue={setEstado}
  possible_values={estados}
  title="Escolha o estado"
  {getValueTitle}
  {getImageFromValue}
/>
