import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class StackedColumn100Chart extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.value);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			animationEnabled: true,
			title:{
				text: ""
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
					fontSize: 16,
					itemclick: this.toggleDataSeries
			},
			toolTip: {
				shared: true
			},
			data: [
			{
				type: "stackedColumn100",
				name: "minified in KB",
				showInLegend: true,
				color: "#65c3f8",
				dataPoints: [
					{ label: this.props.value[0].versionedName, y:(this.props.value[0].minified/1024)},
					{ label: this.props.value[1].versionedName, y:(this.props.value[1].minified/1024)},
					{ label: this.props.value[2].versionedName, y:(this.props.value[2].minified/1024)},
					{ label: this.props.value[3].versionedName, y:(this.props.value[3].minified/1024)}
				]
			},
			{
				type: "stackedColumn100",
				name: "minified + gzip in KB",
				showInLegend: true,
				color: "#65a1f8",
				dataPoints: [
					{ label: this.props.value[0].versionedName, y:(this.props.value[0].gzipped/1024)},
					{ label: this.props.value[1].versionedName, y:(this.props.value[1].gzipped/1024)},
					{ label: this.props.value[2].versionedName, y:(this.props.value[2].gzipped/1024)},
					{ label: this.props.value[3].versionedName, y:(this.props.value[3].gzipped/1024)}
				]
			},
			]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StackedColumn100Chart;