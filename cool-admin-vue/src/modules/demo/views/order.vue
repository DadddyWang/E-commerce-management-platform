<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</el-row>

		<el-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="demo-order" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "订单号", prop: "orderNo", required: true, component: { name: "el-input" } },
		{
			label: "订单类型",
			prop: "orderType",
			component: {
				name: "el-radio-group",
				options: [
					{ label: "潮流服饰", value: "潮流服饰" },
					{ label: "数码产品", value: "数码产品", color: "#67C23A" },
					{ label: "日用百货", value: "日用百货", color: "#00FFFF" },
					{ label: "母婴用品", value: "母婴用品", color: "#FFA500" },
					{ label: "家用电器", value: "家用电器", color: "#FF0000" }
				]
			},
			value: 0,
			required: true
		},
		{
			label: "订单金额",
			prop: "orderAmount",
			component: { name: "el-input-number", props: { min: 0 } },
			required: true
		},
		{ label: "购买用户id", prop: "userId", required: true, component: { name: "el-input" } },
		{ label: "收货地", prop: "address", required: true, component: { name: "el-input" } },
		{
			label: "支付状态",
			prop: "payStatus",
			component: {
				name: "el-radio-group",
				options: [
					{ label: "未支付", value: 0, color: "#FF0000" },
					{ label: "已支付", value: 1, color: "#67C23A" }
				]
			},
			required: true
		},
		{
			label: "发货状态",
			prop: "shipmentStatus",
			component: {
				name: "el-radio-group",
				options: [
					{ label: "未发货", value: 0, color: "#FF0000" },
					{ label: "已发货", value: 1, color: "#67C23A" }
				]
			},
			required: true
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "ID", prop: "id" },
		{ label: "订单号", prop: "orderNo" },
		{
			label: "订单类型",
			prop: "orderType",
			dict: [
				{ label: "潮流服饰", value: "潮流服饰" },
				{ label: "数码产品", value: "数码产品", color: "#67C23A" },
				{ label: "日用百货", value: "日用百货", color: "#00FFFF" },
				{ label: "母婴用品", value: "母婴用品", color: "#FFA500" },
				{ label: "家用电器", value: "家用电器", color: "#FF0000" }
			]
		},
		{ label: "订单金额", prop: "orderAmount" },
		{ label: "购买用户id", prop: "userId" },
		{ label: "收货地", prop: "address" },
		{
			label: "支付状态",
			prop: "payStatus",
			dict: [
				{ label: "未支付", value: 0, color: "#FF0000" },
				{ label: "已支付", value: 1, color: "#67C23A" }
			]
		},
		{
			label: "发货状态",
			prop: "shipmentStatus",
			dict: [
				{ label: "未发货", value: 0, color: "#FF0000" },
				{ label: "已发货", value: 1, color: "#67C23A" }
			]
		},
		{ label: "创建时间", prop: "createTime" },
		{ label: "更新时间", prop: "updateTime" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.demo.order
	},
	(app) => {
		app.refresh();
	}
);
</script>
