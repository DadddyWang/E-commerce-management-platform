<template>
	<div class="count-sales">
		<div class="card">
			<div class="card__header">
				<span class="label">总销售额</span>
				<span class="value">￥15920</span>
			</div>

			<div class="card__footer">
				<div class="sales">
					<span class="label">今日销售额</span>
					<span class="value">￥1298.01</span>
				</div>
				<div class="sales">
					<span class="label">昨日销售额</span>
					<span class="value">￥1123.01</span>
				</div>
			</div>

			<div class="card__container">
				<ul class="count-sales__cop">
					<li>
						<span>日同比</span>

						<div class="rise">
							<i class="el-icon-top-right"></i>
							<span>+7%</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

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
