<template>
	<div class="count-paid">
		<div class="card">
			<div class="card__header">
				<div class="sales">
					<span class="label">支付笔数</span>
					<span class="value">{{ isPayed }}</span>
				</div>
				<div class="sales">
					<span class="label">未支付笔数</span>
					<span class="value">{{ notPayed }}</span>
				</div>
			</div>

			<div class="card__container">
				<el-progress :percentage="translateRate" :stroke-width="10" />
			</div>

			<div class="card__footer">
				<span class="label">转化率</span>
				<span class="value">{{ translateRate }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { request } from "/@/cool/service/request";
const isPayed = ref(0);
const notPayed = ref(0);
const translateRate = ref(0);
const fetchTotalPrice = async () => {
	const { payOrder, unpayOrder } = (await request.get("/dev/dashboard/totalOrder")) as any;
	isPayed.value = Number(payOrder);
	notPayed.value = Number(unpayOrder);
	translateRate.value = Number(
		((isPayed.value / (isPayed.value + notPayed.value)) * 100).toFixed(2)
	);
};
onMounted(() => {
	fetchTotalPrice();
});
</script>

<style lang="scss" scoped>
.card__header {
	display: flex;
	justify-content: space-between;
}
.sales {
	text-align: center;
}
.count-paid {
	.card {
		.echarts {
			height: 50px;
			width: 100%;
		}
		&__container {
			padding-top: 15px;
			padding-right: 10px;
			box-sizing: border-box;
		}
	}
}
</style>
