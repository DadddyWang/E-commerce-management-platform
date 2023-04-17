<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
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

<script lang="ts" name="demo-message" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "发送者id", prop: "sender_id", required: true, component: { name: "el-input" } },
		{ label: "接收者id", prop: "receiver_id", required: true, component: { name: "el-input" } },
		{ label: "通知类别", prop: "type", required: true, component: { name: "el-input" } },
		{ label: "通知标题", prop: "title", required: true, component: { name: "el-input" } },
		{
			label: "通知内容",
			prop: "text",
			component: { name: "el-input" },
			required: true
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "ID", prop: "id" },
		{ label: "通知标题", prop: "title" },
		{ label: "通知内容", prop: "text" },
		//有颜色的
		{
			label: "通知类别",
			prop: "type",
			dict: [
				{ label: "系统通知", value: 1 },
				{ label: "活动通知", value: 2, color: "#67C23A" }
			]
		},
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.demo.message
	},
	(app) => {
		app.refresh();
	}
);
</script>
