<template>
	<div class="count-effect">
		<div class="card">
			<div class="card__header">
				<span class="label">未发货商品数</span>
				<span class="value">34</span>
			</div>

			<div class="card__container">
				<span class="label">未发货商品比例</span>
				<el-progress :percentage="10" :stroke-width="8" />
			</div>

			<div class="card__footer"></div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.count-effect {
	&__cop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

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

	.card__container {
		padding-top: 30px;
		padding-right: 10px;
		box-sizing: border-box;
	}
}
</style>
