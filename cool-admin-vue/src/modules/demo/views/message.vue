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

<script lang="ts" name="demo-message" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "发送者id", prop: "sender_id", required: true, component: { name: "el-input" } },
		{ label: "接收者id", prop: "receiver_id", required: true, component: { name: "el-input" } },
		{ label: "消息标题", prop: "title", required: true, component: { name: "el-input" } },
		{
			label: "消息内容",
			prop: "text",
			component: { name: "cl-editor-wang", props: { height: 400 } },
			required: true
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "ID", prop: "id" },
		{ label: "发送者id", prop: "sender_id" },
		{ label: "接收者id", prop: "receiver_id" },
		{ label: "消息标题", prop: "title" },
		{ label: "消息内容", prop: "text" },
		{ label: "是否阅读", prop: "is_read" },
		{ label: "创建时间", prop: "createTime" },
		{ label: "更新时间", prop: "updateTime" },
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
