document.addEventListener('DOMContentLoaded', (event) => {
  popularSelect();
});

document.getElementById('btn').addEventListener('click', (e) => {
  popularResult();
})

function getCurrency(cotacao) {
    return new Promise((resolve, reject) => {
      try {
        let xhttp = null;
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
          xhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 8 and older
          xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
  
        const url = `https://economia.awesomeapi.com.br/last/${cotacao}`;
  
        xhttp.open("GET", url, false);
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              const responseObject = JSON.parse(this.responseText);
  
              resolve(responseObject);
            } else if (this.status == 404) {
              reject('Não encontrado!');
            } else {
              reject('Falha na requisição!');
            }
          }
        };
        xhttp.send();
      } catch (error) {
        reject(error);
      }
    });
}

function getCoins() {
  return new Promise((resolve, reject) => {
    try {
      let xhttp = null;
      if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        xhttp = new XMLHttpRequest();
      } else if (window.ActiveXObject) { // IE 8 and older
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }

      const url = `https://economia.awesomeapi.com.br/json/available/uniq`;

      xhttp.open("GET", url, false);
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            const responseObject = JSON.parse(this.responseText);
  
            resolve(responseObject);
          } else {
            reject('Falha na requisição!');
          }
        }
      };
      xhttp.send();
    } catch (error) {
      reject(error);
    }
  });
}

function popularSelect() {
  getCoins().then((result) => {
    const defaultOption = '<option value="">Escolha uma opção...</option>';

    const optionsArray = Object.entries(result).map(([chave, valor]) => {
      return { chave, valor };
    });

    optionsArray.sort((a, b) => a.valor.localeCompare(b.valor));

    const resultOptions = optionsArray.map((option) => {
      return `<option value="${option.chave}">${option.valor}</option>`;
    }).join('');

    const resultMoedas = defaultOption + resultOptions;

    document.getElementById('firstSelect').innerHTML = resultMoedas;
    document.getElementById('secondSelect').innerHTML = resultMoedas;

  }).catch((failed) => {
  })
}

function popularResult() {
  let firstSelect = document.getElementById("firstSelect").value;
  let secondSelect = document.getElementById("secondSelect").value;
  let value = document.getElementById("value").value;
  let resultCurrency = document.getElementById("result");
  let cotacao = firstSelect + "-" + secondSelect;

  if (isNaN(value)) {
    resultCurrency.innerText = "Insira apenas números!";
  } else if (value === "") {
    resultCurrency.innerText = "Selecione o valor!";
  } else if (firstSelect === "" || secondSelect === "") {
    resultCurrency.innerText = "Selecione as opções!";
  } else {
      getCurrency(cotacao).then((result) => {
          const firstKey = Object.keys(result)[0];
          const firstValue = result[firstKey];
          const finalResult = parseFloat(firstValue.ask) * parseFloat(value);
  
          resultCurrency.innerText = finalResult.toFixed(2);
      }).catch((failed) => {
          resultCurrency.innerText = failed;
      })
  }
}