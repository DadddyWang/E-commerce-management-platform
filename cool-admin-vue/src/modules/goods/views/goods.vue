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

<script lang="ts" name="demo-goods" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "标题", prop: "title", required: true, component: { name: "el-input" } },
		{ label: "图片", prop: "pic", component: { name: "cl-upload" }, required: true },
		{
			label: "价格",
			prop: "price",
			component: { name: "el-input-number", props: { min: 0 } },
			required: true
		},
		{
			label: "分类",
			prop: "type",
			component: {
				name: "el-radio-group",
				options: [
					{ label: "潮流服饰", value: 0 },
					{ label: "数码产品", value: 1, color: "#67C23A" },
					{ label: "日用百货", value: 2, color: "#00FFFF" },
					{ label: "母婴用品", value: 3, color: "#FFA500" },
					{ label: "家用电器", value: 4, color: "#FF0000" }
				]
			},
			value: 0,
			required: true
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "ID", prop: "id" },
		{ label: "标题", prop: "title" },
		{ label: "图片", prop: "pic", component: { name: "cl-image", props: { size: 60 } } },
		{ label: "价格", prop: "price" },
		{
			label: "分类",
			prop: "type",
			dict: [
				{ label: "潮流服饰", value: 0 },
				{ label: "数码产品", value: 1, color: "#67C23A" },
				{ label: "日用百货", value: 2, color: "#00FFFF" },
				{ label: "母婴用品", value: 3, color: "#FFA500" },
				{ label: "家用电器", value: 4, color: "#FF0000" }
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
		service: service.demo.goods
	},
	(app) => {
		app.refresh();
	}
);
</script>
