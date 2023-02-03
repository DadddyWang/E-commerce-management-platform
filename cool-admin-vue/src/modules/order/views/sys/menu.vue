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

<script lang="ts" name="base-sys-menu" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "父菜单ID", prop: "parentId", component: { name: "el-input" } },
		{ label: "菜单名称", prop: "name", required: true, component: { name: "el-input" } },
		{ label: "菜单地址", prop: "router", component: { name: "el-input" } },
		{ label: "权限标识", prop: "perms", component: { name: "el-input" } },
		{
			label: "类型",
			prop: "type",
			component: {
				name: "el-radio-group",
				options: [
					{ value: "0：目录" },
					{ value: "1：菜单", color: "#67C23A" },
					{ value: "2：按钮", color: "#E6A23C" }
				]
			},
			value: "0：目录",
			required: true
		},
		{ label: "图标", prop: "icon", component: { name: "cl-upload" } },
		{
			label: "排序",
			prop: "orderNum",
			component: { name: "el-input-number", props: { min: 0 } },
			required: true
		},
		{ label: "视图地址", prop: "viewPath", component: { name: "el-input" } },
		{ label: "路由缓存", prop: "keepAlive", required: true, component: { name: "el-input" } },
		{ label: "是否显示", prop: "isShow", required: true, component: { name: "el-input" } }
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "ID", prop: "id" },
		{ label: "父菜单ID", prop: "parentId" },
		{ label: "菜单名称", prop: "name" },
		{ label: "菜单地址", prop: "router" },
		{ label: "权限标识", prop: "perms" },
		{
			label: "类型",
			prop: "type",
			dict: [
				{ value: "0：目录" },
				{ value: "1：菜单", color: "#67C23A" },
				{ value: "2：按钮", color: "#E6A23C" }
			]
		},
		{ label: "图标", prop: "icon", component: { name: "cl-image", props: { size: 60 } } },
		{ label: "排序", prop: "orderNum" },
		{ label: "视图地址", prop: "viewPath" },
		{ label: "路由缓存", prop: "keepAlive" },
		{ label: "是否显示", prop: "isShow" },
		{ label: "创建时间", prop: "createTime" },
		{ label: "更新时间", prop: "updateTime" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.base.sys.menu
	},
	(app) => {
		app.refresh();
	}
);
</script>
