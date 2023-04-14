<template>
	<div class="count-sales">
		<div class="card">
			<div class="card__header">
				<span class="label">总销售额</span>
				<span class="value">{{ totalPrice }}</span>
			</div>

			<div class="card__footer">
				<div class="sales">
					<span class="label">今日销售额</span>
					<span class="value">{{ todayPrice }}</span>
				</div>
				<div class="sales">
					<span class="label">昨日销售额</span>
					<span class="value">{{ yesterdayPrice }}</span>
				</div>
			</div>

			<div class="card__container">
				<ul class="count-sales__cop">
					<li>
						<span>日同比</span>

						<div class="rise">
							<i class="el-icon-top-right"></i>
							<span>{{ calcRise }}%</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { request } from "/@/cool/service/request";
const todayPrice = ref(0);
const totalPrice = ref(0);
const yesterdayPrice = ref(0);
const calcRise = ref(0);
const fetchTotalPrice = async () => {
	const { todayAmount, totalAmount, yesterdayAmount } = (await request.get(
		"/dev/dashboard/totalAmount"
	)) as any;
	todayPrice.value = Number(todayAmount);
	totalPrice.value = Number(totalAmount);
	yesterdayPrice.value = Number(yesterdayAmount);
	calcRise.value = ((todayPrice.value - yesterdayPrice.value) / yesterdayPrice.value) * 100 || 0;
};
onMounted(() => {
	fetchTotalPrice();
});
</script>

<style lang="scss" scoped>
.card__footer {
	display: flex;
	justify-content: space-between;
}
.sales {
	text-align: center;
}

.count-sales {
	&__cop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;

		li {
			display: flex;
			list-style: none;
			flex: 1;
			color: #d8d8d8;

			.fall,
			.rise {
				display: flex;
				align-items: center;
				margin-left: 10px;
			}

			.fall {
				color: #13ae7c;
			}

			.rise {
				color: #f21e37;
			}
		}
	}
}
</style>
