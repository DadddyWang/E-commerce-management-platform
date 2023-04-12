<template>
	<div class="count-paid">
		<div class="card">
			<div class="card__header">
				<div class="sales">
					<span class="label">支付笔数</span>
					<span class="value">6560</span>
				</div>
				<div class="sales">
					<span class="label">未支付笔数</span>
					<span class="value">1000</span>
				</div>
			</div>

			<div class="card__container">
				<el-progress :percentage="10" :stroke-width="10" />
			</div>

			<div class="card__footer">
				<span class="label">转化率</span>
				<span class="value">60%</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

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
