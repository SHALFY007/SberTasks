<script lang="ts">
  let valueCodes: Array<String> = [];
  let firstCur: string = "USD";
  let secondCur: string = "RUB";
  let sum: string = "";
  let count:string = '';
  let link: string = "https://open.er-api.com/v6/latest/";

  const query = async (link:string) => {
    let response = await fetch(link);

    if (response.ok) {
      let json = await response.json();
      return json
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  };

  const getData = async () => {
    let json = await query(link+'USD')
      for (let value of Object.keys(json.rates)) {
        valueCodes = [...valueCodes, value];
      }
  };

  const change = async () => {
    if (sum != "") {

      let json = await query(link + secondCur)
      count = (json.rates[firstCur] * parseInt(sum)).toFixed(2);
    }
  };

  const changeReverse = async () => {
    if (count != "") {
      console.log(sum);
      let json = await query(link + firstCur);
      sum = (json.rates[secondCur] * parseInt(count)).toFixed(2);
    } else {
      sum = "";
    }
  };

  getData();
</script>

<main>
  <h1>КОНВЕРТАТОР</h1>
  <div class="flex">
    <div>
      <h3>Перевести из</h3>
      <ul class="values_list">
        {#each valueCodes as value}
          <li
            on:click={(e) => (secondCur = e.target.innerText)}
            on:click={change}
          >
            {value.toUpperCase()}
          </li>
        {/each}
      </ul>
    </div>
    <div>
      <h3>Перевести в</h3>
      <ul class="values_list">
        {#each valueCodes as value}
          <li
            on:click={(e) => (firstCur = e.target.innerText)}
            on:click={change}
          >
            {value.toUpperCase()}
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <h4 class="pare">{firstCur}/{secondCur}</h4>
  <p>{secondCur}</p>
  <input type="text" bind:value={sum} on:input={change} placeholder="0" />
  <p>{firstCur}</p>
  <input
    type="text"
    bind:value={count}
    on:input={changeReverse}
    placeholder="0"
  />
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
