<script lang="ts">
  let valueCodes: Array<String> = [];
  let firstCur: string = "USD";
  let secondCur: string = "RUB";
  let sum: number = 0;
  let count: any = 0;
  let link:string = 'https://open.er-api.com/v6/latest/'

  const getData = async () => {
    let response = await fetch("https://www.floatrates.com/daily/rub.json");

    if (response.ok) {
      let json = await response.json();
      console.log(json);
      for (let value of Object.keys(json)) {
        valueCodes = [...valueCodes, value];
      }
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  };

  getData();
  console.log(valueCodes);
</script>

<main>
  <h1>КОНВЕРТАТОР</h1>
  <div class="flex">
    <ul class="values_list">
      {#each valueCodes as value}
        <li on:click={(e) => (firstCur = e.target.innerText)}>
          {value.toUpperCase()}
        </li>
      {/each}
    </ul>
    <ul class="values_list">
      {#each valueCodes as value}
        <li on:click={(e) => (secondCur = e.target.innerText)}>
          {value.toUpperCase()}
        </li>
      {/each}
    </ul>
  </div>
  <h4 class="pare">{firstCur}/{secondCur}</h4>
  <input type="text" bind:value={sum}/>
  <p>{sum}{secondCur} = {count}{firstCur}</p>
</main>

<style>
  .flex {
    display: flex;
    justify-content: space-between;
  }

  .values_list {
    list-style-type: none;
    max-height: 300px;
    overflow-y: scroll;
  }
</style>
