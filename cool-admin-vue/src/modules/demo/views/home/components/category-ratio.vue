<template>
	<div class="category-ratio">
		<div class="category-ratio__header">
			<span>销售额类别占比</span>
		</div>

		<div class="category-ratio__container">
			<v-chart :option="chartOption" autoresize />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { request } from "/@/cool/service/request";
const categoryData = ref<any[]>([]);
const type = ref<any[]>([]);
const fetchData = async () => {
	const data: any[] = await request.get("/dev/dashboard/categoryAmount");
	data.forEach((element: any) => {
		categoryData.value.push({
			value: element.categoryAmount,
			name: element.orderType
		});
		type.value.push(element.orderType);
	});
	chartOption.series[0].data = categoryData.value;
	chartOption.legend.data = type.value;
};
onMounted(() => {
	fetchData();
});
const chartOption = reactive({
	tooltip: {
		trigger: "item",
		formatter: "{a} <br/>{b}: {c} ({d}%)"
	},
	legend: {
		bottom: 30,
		left: "center",
		data: ["手机", "相机", "耳机", "音箱", "手表"]
	},
	color: ["#3AA1FF", "#36CBCB", "#F2637B", "#975FE5", "#FBD437"],
	series: [
		{
			name: "访问来源",
			type: "pie",
			radius: ["50%", "60%"],
			center: ["50%", "40%"],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: "center"
			},
			emphasis: {
				label: {
					show: true,
					fontSize: "30",
					fontWeight: "bold"
				}
			},
			labelLine: {
				show: false
			},
			data: [
				{ value: 335, name: "手机" },
				{ value: 310, name: "相机" },
				{ value: 234, name: "耳机" },
				{ value: 135, name: "音箱" },
				{ value: 500, name: "手表" }
			],
			itemStyle: {
				borderColor: "#fff",
				borderWidth: 4
			},
			roundCap: 1
		}
	]
});
</script>

<style lang="scss" scoped>
.category-ratio {
	&__header {
		display: flex;
		align-items: center;
		height: 50px;
		font-size: 15px;
		font-weight: bold;
		padding: 0 20px;
	}

	&__container {
		height: 395px;
		padding: 0 20px;
		box-sizing: border-box;

		.echarts {
			width: 100%;
		}
	}
}
</style>
