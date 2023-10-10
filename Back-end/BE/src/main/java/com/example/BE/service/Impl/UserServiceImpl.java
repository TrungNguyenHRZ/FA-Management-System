package com.example.BE.service.Impl;

import com.example.BE.dto.request.user.CreateUserRequest;
import com.example.BE.dto.request.user.GetAllRequest;
import com.example.BE.dto.response.user.UserPageResponse;
import com.example.BE.dto.response.user.UserResponse;
import com.example.BE.enums.ErrorMessage;
import com.example.BE.enums.Gender;
import com.example.BE.enums.Role;
import com.example.BE.handle.BusinessException;
import com.example.BE.model.entity.User;
import com.example.BE.model.entity.UserPermission;
import com.example.BE.repository.UserPermissionRepository;
import com.example.BE.repository.UserRepository;
import com.example.BE.service.UserService;
import com.example.BE.util.RandomStringGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserPermissionRepository userPermissionRepository;


    @Override
    public UserResponse createUser(CreateUserRequest request) {
        try {
            log.info("Create user with request :{}", request.toString());
            User userAdmin = userRepository.findByUserId(request.getUserAdminId()).orElse(null);
            log.info("User Admin : {}", userAdmin);
            if (Objects.isNull(userAdmin)) {
                throw new BusinessException(ErrorMessage.USER_ADMIN_INVALID);
            }
            if (!Role.SUPER_ADMIN.getRole().equals(userAdmin.getPermission().getRole())) {
                throw new BusinessException(ErrorMessage.USER_DO_NOT_PERMISSION);

            }

            if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                throw new BusinessException(ErrorMessage.USER_EMAIL_FORMAT_INCORRECT);
            }

            User user = userRepository.findByEmail(request.getEmail()).orElse(null);
            if (Objects.nonNull(user)) {
                throw new BusinessException(ErrorMessage.USER_EMAIL_EXISTED);
            }

            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Date dateOfBirth = dateFormat.parse(request.getDob());
            String gender = request.isGenderTrueMale() ? Gender.MALE.getGender() : Gender.FEMALE.getGender();
            UserPermission userPermission = userPermissionRepository.findFirstByRole(request.getUserType().getRole()).orElse(null);
            if (Objects.isNull(userPermission)) {
                throw new BusinessException(ErrorMessage.USER_PERMISSION_INVALID);
            }
            String password = RandomStringGenerator.generateRandomString(8);

            user = new User();
            user.setName(request.getName());
            user.setCreatedDate(new Date());
            user.setPhone(request.getPhone());
            user.setDob(dateOfBirth);
            user.setGender(gender);
            user.setEmail(request.getEmail());
            user.setStatus(true);
            user.setPermission(userPermission);
            user.setPassword(password);
            user.setCreateBy(userAdmin.getName());

            user = userRepository.save(user);
            user.setUserIdSearch(String.valueOf(user.getUserId()));
            user = userRepository.save(user);
            return new UserResponse(user);

        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            throw new BusinessException(ErrorMessage.USER_CREATE_FAIL);
        }
    }


    @Override
    public UserPageResponse getAllUser(GetAllRequest request) {
        Pageable pageable = request.getPageable();
        Page<User> page = userRepository.findAllWithSearch(request.getKeyword(), pageable);
        return  new UserPageResponse()
            .setPage(page.getNumber())
            .setPageSize(page.getSize())
            .setTotalElement(page.getNumberOfElements())
            .setTotalPage(page.getTotalPages())
            .setUserResponseList(page.getContent().stream().map(UserResponse::new).collect(Collectors.toList()));
    }

    @Override
    public UserResponse getUserById(int id) {
        try {
            User user = userRepository.findByUserId(id).orElse(null);
            if (Objects.isNull(user)) {
                throw new BusinessException(ErrorMessage.USER_NOT_FOUND);
            }
            return new UserResponse(user);
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException(ErrorMessage.USER_GET_FAIL);
        }
    }

    @Override
    public UserResponse updateInfoUser() {
        return null;
    }

    @Override
    public UserResponse gantPermissionUser() {
        return null;
    }
}
