package com.example.BE.entity;

import java.util.HashSet;
import java.util.Set;

import com.example.BE.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "user_permission")
public class UserPermission {


	/*
	* |CREATE| READ| UPDATE | DELETE | IMPORT|
	* |	  0  |  1  |    2   |    3   |   4   |
	* 2
	* |   1  |  2  |    4   |    8   |   16  |
	*
	* Xem các quyền create, read, update, delete, import lần lượt là thứ tự từ 0 - 4. Các quyền có giá trị nhât định. user có
	* quyền nào thì cộng giá trị vào mục đó. Ví dụ: tại muc user management, giá trị sẽ là 1 + 2 + 4 + 8 + 16 = 31 => USER có toàn quyền.
	* nếu giá trị bằng 3 => 3 = 1 + 2 => user chỉ có quyền create và read
	* */

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PermissionID")
	public int permissionID;

	@Enumerated(EnumType.STRING)
	@Column(name="role")
	public Role role;

	@Column(name="training_program")
	public int trainingProgram;

	@Column(name="syllabus")
	public int syllabus;

	@Column(name="learning_material")
	public String material;

	@Column(name="UserManagement")
	public int user_management;

	@Column(name="class")
	private int class_name;

	@OneToMany(mappedBy = "permission")
	private Set<User> userList = new HashSet<>();

}
