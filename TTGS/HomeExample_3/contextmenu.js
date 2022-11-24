var listConfig = {
    1: config_1,
    2: config_2,
    3: config_3,
    // 4: config_4,
    5: config_5
}
var selects = document.querySelectorAll(".contextmenu-select")
function updateRoot(index) {
    // console.log(index);

    switch (index) {
        case "1":
            // console.log(index);
            // CHART_1.destroy()
            // console.log(chart_1);
            // CHART_1 = new Chart(chart_1, listConfig[1])
            CHART_1.update()

            break
        case "2":
            CHART_2.update()
            break
        case "3":
            CHART_3.update()
            break
        case "4":
            CHART_4.update()
            break
        case "5":
            CHART_5.update()
            break


    }
}
function changeColor(chart) {
    var index = chart.className.slice(-1)
    var listColor = listConfig[index].data.datasets[0].backgroundColor
    // list color
    // console.log(listColor);
    var colorHtml = listColor.reduce(function (colors, color, index) {
        colors.push(`
        <div class="d-flex align-items-center justify-content-center">
        <input class="pe-2 input-color_${index} input-color" type="color" id="color" name="color" value="${color}">
        <i class="fa-solid fa-xmark ps-2 icon-x"></i>
      </div>
        `)
        return colors
    }, [])

    var html = colorHtml.join("")
    html = `<h6 class="text-center">Kiểu biểu đồ</h6>`.concat(html)
    html = html.concat(`
    <div class="d-flex add-color ">
    <div class="" style="height: 24px; width: 82px;">
    <i class="fa-solid fa-plus " style="margin-left: 5px;"></i>
    </div>
    
  </div>`)
    document.querySelector(".contextmenu_2").innerHTML = html
    listInputColor = Array.from(document.querySelectorAll(".input-color"))
    listInputColor.forEach(function (inputColor, i) {
        inputColor.onchange = function () {
            listColor[i] = inputColor.value
            listConfig[index].data.datasets[0].backgroundColor = listColor
            updateRoot(index)

        }
    })
    var addColor = document.querySelector(".add-color")
    // var inputColorIndex = listColor.length + 1
    var menu2 = document.querySelector(".contextmenu_2")
    addColor.onclick = function () {
        console.log("object");
        menu2.insertAdjacentHTML("beforeend",
            ` <div class="d-flex align-items-center justify-content-center">
            <input class="pe-2 input-color_${listColor.length} input-color" type="color" id="color" name="color" value="#333">
            <i class="fa-solid fa-xmark ps-2 icon-x"></i>
          </div>`);
        listConfig[index].data.datasets[0].backgroundColor.push(`#333`)
        listColor = listConfig[index].data.datasets[0].backgroundColor
        updateRoot(index)
        var newInputColor = document.querySelector(`.input-color_${listColor.length - 1}`)
        console.log(newInputColor);
        newInputColor.onchange = function () {
            listColor[listColor.length - 1] = newInputColor.value
            listConfig[index].data.datasets[0].backgroundColor = listColor
            updateRoot(index)

        }
    }





}
function changeChartType(chart) {
    // check last string
    // console.log(chart.className.slice(-2));
    var index = chart.className.slice(-1)
    var config = `config_${index}`
    var CHART = `CHART_${index}`
    // console.log(config, CHART);
    Array.from(selects).forEach(function (select) {
        // show selection by index 
        // console.log(selects[index]);
        select.onclick = function () {
            switch (select.innerText) {
                case "Cột":
                    listConfig[index].type = "bar"
                    listConfig[index].options.scales.r = ""
                    updateRoot(index)
                    break
                case "Đường":
                    listConfig[index].options.scales.r = ""

                    listConfig[index].type = "line"
                    updateRoot(index)
                    break
                case "Tròn":
                    listConfig[index].options.scales.r = ""

                    listConfig[index].options.scales.x = ""
                    listConfig[index].options.scales.y = ""
                    listConfig[index].type = "pie"
                    updateRoot(index)
                    break
                case "Polar":
                    listConfig[index].options.scales.x = ""
                    listConfig[index].options.scales.y = ""

                    listConfig[index].type = "polarArea"
                    updateRoot(index)
                    break
                case "Radar":
                    listConfig[index].options.scales.x = ""
                    listConfig[index].options.scales.y = ""

                    listConfig[index].type = "radar"

                    updateRoot(index)

                    break

            }
        }

    })
}
function removeColor(chart) {
    var index = chart.className.slice(-1)
    var listColor = listConfig[index].data.datasets[0].backgroundColor
    listX = Array.from(document.querySelectorAll(".icon-x"))
    listX.forEach(function (x, i) {
        x.onclick = function () {
            var color = document.querySelector(`.input-color_${i}`).value
            console.log(listColor,color);
            var newListColor = listColor.filter(function(item) {
                return item !== color.toUpperCase()
            })
            console.log(newListColor);
            listConfig[index].data.datasets[0].backgroundColor = newListColor
            updateRoot(index)
            x.parentElement.remove()


        }
    })

}

function customChartMenu(chartId, menuId) {
    var chart = document.querySelector(chartId);
    var menu = document.querySelector(menuId);
    // show the chart
    // console.log(chart);
    chart.addEventListener("contextmenu", function (event) {
        menu.style.display = 'block';
        menu.style.top = event.y + 'px';
        menu.style.left = event.x + 'px';
        event.preventDefault();
        changeChartType(chart)
        changeColor(chart)
        removeColor(chart)

    })
    document.onscroll = function () {
        menu.style.display = 'none';
    }
}
// var testResize = document.querySelector(".chart_2")
// console.log(testResize.parentElement);
// testResize.parentElement.id = "resize"
// console.log(testResize.parentElement.id);
// interactive("btn1",{ resize: false });
// resizable('btn1');


// Test change type chart
// console.log("===");
// console.log(config_1.type = "line");
// CHART_1.update();






