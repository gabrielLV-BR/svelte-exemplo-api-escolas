<script lang="ts">
  import type { Escola } from "../api/escolas";

  import expandImg from "../assets/expand.svg";
  import JsonViewer from "./JsonViewer.svelte";

  export let escola: Escola;

  $: entries = Object.entries(escola);

  const {
    nome,
    cidade,
    cod,
    estado,
    situacaoFuncionamentoTxt,
    enemMediaGeral,
    regiao,
  } = escola;

  export let voltar: () => void;
</script>

<div class="display">
  <header>
    <span on:click={voltar} on:keydown={voltar}>
      <img width="50" src={expandImg} alt="Voltar" />
      <span> Voltar </span>
    </span>
  </header>
  <div class="content">
    <section class="data">
      <p>
        <span> Código: </span>
        {cod}
      </p>
      <p>
        <span> Nome: </span>
        {nome}
      </p>
      <p>
        <span> Cidade: </span>
        {cidade}
      </p>
      <p>
        <span> Estado: </span>
        {estado}
      </p>
      <p>
        <span> Regiãoo: </span>
        {regiao}
      </p>
      <p>
        <span> Situação: </span>
        {situacaoFuncionamentoTxt}
      </p>
      <p>
        <span> Média do ENEM: </span>
        {enemMediaGeral != 0 ? enemMediaGeral : "Sem dados"}
      </p>
    </section>
    <section class="json">
      <JsonViewer {entries} />
    </section>
  </div>
</div>

<style lang="scss">
  .display {
    &,
    header > span {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    flex-direction: column;

    position: relative;

    overflow: auto;

    width: 100%;
    height: 100%;

    header {
      cursor: pointer;

      flex-direction: row;

      position: fixed;
      right: calc(50% - 7rem);
      top: 1rem;

      width: 5rem;
      height: 3rem;

      span img {
        height: 2rem;
        width: auto;

        rotate: 90deg;

        margin: 0;
        filter: invert(1);
      }
    }
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 1rem;
    padding: 2rem;
  }

  .data {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    p {
      margin: 0;
      font-size: 1.5rem;
    }

    span {
      font-style: italic;
      color: #898989;
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 960px) {
    .content {
      overflow: scroll;
      flex-direction: column;
    }
  }
</style>
