/* eslint-env browser */

import $ from 'jquery';
import Chart from 'chart.js';

import Controller from './index';

export default class extends Controller {
  createChart(id, obj, title, type, background) {
    this.createChartContext(id, title);
    const canvas = document.getElementById(id).getContext('2d');
    const data = {
      labels: obj.keys,
        datasets: [{
          label: title,
          data: obj.values,
          backgroundColor: background,
        }]
    };
    const instructions = {
      // list of type of chart: http://www.chartjs.org/docs/latest/charts/
      type,
      data,
      options: {
        hover: {
          mode: null
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          enabled: false
        }
      }
    };
    if ( type == "bar") {
      instructions.options = {
        scales: { 
          yAxes: [{ 
            ticks : { 
              beginAtZero: true 
            }
          }]
        }   
      }
    }
    new Chart(canvas, instructions);
  }

  createChartContext(id, title) {
    this.context.append(`
      <div 
        class="chart-container" 
        style="position:relative; display:inline-block; width: 20vw">
          <canvas id=${id}> 
          </canvas> 
      </div>
    `);
    this.dropdown.append(`
      <div class="item" data-value=${id}>
        ${title}
      </div> 
    `);
  }

  getContentTypes() {
    $.ajax({
      url: '/datas',
      method: 'GET'
    }).done((datas) => {
      const et = {
        keys: datas.encryptionTypes.map(e => e._id),
        values: datas.encryptionTypes.map(e => e.count)
      };
      const ct = {
        keys: datas.contentTypes.map(dt => dt._id),
        values: datas.contentTypes.map(dt => dt.count)
      };
      this.createChart(
        'contentType',
        ct,
        'Content types',
        'pie',
        this.bgc
      );
      this.createChart(
        'encryptionType',
        et,
        'Encryption types',
        'polarArea',
        this.bgc
      );
      this.createChart(
        'serverToday',
        { keys: ['ServerToday', 'serverYesterday'], 
          values: [datas.serverToday.length, 4] },
        'Server contacted today',
        'bar',
        this.bgc
      );
    });
  }

  init() {
    this.dropdown = $('.selection.dropdown .menu');
    this.context = $('.chart-space');
    this.bgc = ['rgba(255, 99, 132, 0.2', 'rgba(54, 162, 235, 0.2'];
    this.getContentTypes();
  }
}


