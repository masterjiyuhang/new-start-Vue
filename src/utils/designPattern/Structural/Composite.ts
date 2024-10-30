/**
 * 组合模式
 *
 * 将对象组合成树形结构以表示“部分-整体”的层次结构。
 * Composite 使得用户对单个对象和组合对象的使用具有一致性。
 *
 * 客户端可以一致的对待单个对象和对象的组合。
 *
 *
 * 基本概念
 * 组件 component
 * 叶子结点 lead
 * 组合结点 composite
 *
 * 适用于
 * 想表示对象的部分-整体层次结构。
 *
 * 算术表达式包括操作数、操作符和另一个操作数，其中，另一个操作数也可以是操作数、操作符和另一个操作数。
 */

/**
 * 假设要设计一个表示文件系统的结构。
 *
 * 文件系统中有两个元素： 文件 file 和文件夹 folder。
 * 文件是叶子节点，文件夹是组合结点， 可以包含文件或其他文件夹。
 */

interface FileSystemComponent {
  getName(): string;
  getSize(): number;
  displayStructure(indent?: string): void;
}

class CompFile implements FileSystemComponent {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
  getName(): string {
    return this.name;
  }
  getSize(): number {
    return this.size;
  }
  displayStructure(indent: string = ""): void {
    console.log(`${indent}- File: ${this.name}, Size: ${this.size}`);
  }
}

class CompFolder implements FileSystemComponent {
  private name: string;
  private contents: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }
  displayStructure(indent: string = ""): void {
    console.log(`${indent}+ Folder: ${this.name}`);
    this.contents.forEach((component) =>
      component.displayStructure(indent + "  "),
    );
  }

  add(component: FileSystemComponent): void {
    this.contents.push(component);
  }

  remove(component: FileSystemComponent): void {
    const index = this.contents.indexOf(component);
    if (index !== -1) {
      this.contents.splice(index, 1);
    }
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.contents.reduce(
      (total, component) => total + component.getSize(),
      0,
    );
  }
}

// 创建一些文件
const file1 = new CompFile("file1.txt", 500);
const file2 = new CompFile("file2.txt", 1500);
const file3 = new CompFile("file3.txt", 300);

// 创建一个文件夹，并向其中添加文件
const folder1 = new CompFolder("Documents");
folder1.add(file1);
folder1.add(file2);

// 创建另一个文件夹，并向其中添加文件和子文件夹
const folder2 = new CompFolder("Work");
folder2.add(file3);
folder2.add(folder1);

// 打印整个文件系统的结构
folder2.displayStructure();
console.log(`Total Size: ${folder2.getSize()} bytes`);
