/* eslint-env browser */

import $ from 'jquery';
import Chart from 'chart.js';

import Controller from './index';

export default class extends Controller {
  createChart(id, obj, title, type, background) {
    this.createChartContext(id);
    const canvas = document.getElementById(id).getContext('2d');
    new Chart(canvas, {
     // list of type of chart: http://www.chartjs.org/docs/latest/charts/
      type: type,
      data: {
        labels: obj.keys,
	datasets: [{
          label: title,
          data: obj.values,
	  backgroundColor: background,
	}]
      },
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
    });
  }

  createChartContext(id) {
    this.context.append(`
      <div 
        class="chart-container" 
        style="position:relative; display:inline-block; width: 20vw">
          <canvas id=${id}> 
          </canvas> 
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
        keys: datas.contentTypes.map((dt) => dt._id),
        values: datas.contentTypes.map((dt) => dt.count)
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
    });
  }

  init() {
    this.context = $('.chart-space');
    this.bgc = ['rgba(255, 99, 132, 0.2', 'rgba(54, 162, 235, 0.2'];
    this.getContentTypes();
  }
  
}



