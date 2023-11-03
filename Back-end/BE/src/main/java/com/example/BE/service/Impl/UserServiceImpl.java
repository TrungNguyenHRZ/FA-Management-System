package com.example.BE.service.Impl;

import com.example.BE.dto.request.user.*;
import com.example.BE.dto.response.user.LoginResponse;
import com.example.BE.dto.response.user.UserPageResponse;
import com.example.BE.dto.response.user.UserResponse;
import com.example.BE.enums.ErrorMessage;
import com.example.BE.enums.Gender;
import com.example.BE.enums.Role;
import com.example.BE.handle.BusinessException;
import com.example.BE.handle.UnauthorizeException;
import com.example.BE.model.Mail;
import com.example.BE.model.entity.User;
import com.example.BE.model.entity.UserPermission;
import com.example.BE.repository.UserPermissionRepository;
import com.example.BE.repository.UserRepository;
import com.example.BE.security.SecurityUtils;
import com.example.BE.security.UserDetailsImpl;
import com.example.BE.security.jwt.JWTUtils;
import com.example.BE.service.UserPermissionService;
import com.example.BE.service.UserService;
import com.example.BE.util.AESUtils;
import com.example.BE.util.RandomStringGenerator;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserPermissionRepository userPermissionRepository;
    private final EmailSenderService emailSenderService;
    private final UserPermissionService userPermissionService;

    @Value("${spring.mail.username}")
    private String mailFrom;

    @Value("${aes.key}")
    private String keyAES;


    @Override
    public UserResponse createUser(CreateUserRequest request) {
        try {
            log.info("Create user with request :{}", request.toString());
            String email = SecurityUtils.getUsernameAuth();
            User userAdmin = userRepository.findByEmail(email).orElse(null);
            log.info("User Admin : {}", userAdmin);
            if (Objects.isNull(userAdmin)) {
                throw new BusinessException(ErrorMessage.USER_ADMIN_INVALID);
            }

            // check permission
            boolean isPermission = userPermissionService.checkCreatePermission(userAdmin.getPermission().getUserManagement());
            if (!isPermission) {
                throw new BusinessException(ErrorMessage.USER_DO_NOT_PERMISSION);
            }

            //
            if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                throw new BusinessException(ErrorMessage.USER_EMAIL_FORMAT_INCORRECT);
            }

            User user = userRepository.findByEmail(request.getEmail()).orElse(null);
            if (Objects.nonNull(user)) {
                throw new BusinessException(ErrorMessage.USER_EMAIL_EXISTED);
            }

//            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
//            Date dateOfBirth = dateFormat.parse(request.getDob());
            String gender = request.isGenderTrueMale() ? Gender.MALE.getGender() : Gender.FEMALE.getGender();
            UserPermission userPermission = userPermissionRepository.findFirstByRole(request.getUserType().getRole()).orElse(null);
            if (Objects.isNull(userPermission)) {
                throw new BusinessException(ErrorMessage.USER_PERMISSION_INVALID);
            }

            if (userPermission.getRole().equals(Role.SUPER_ADMIN.getRole())
                && !userAdmin.getPermission().getRole().equals(Role.SUPER_ADMIN.getRole())) {
                throw new BusinessException(ErrorMessage.USER_DO_NOT_PERMISSION);
            }

            String password = RandomStringGenerator.generateRandomString(8);
            log.info("Gerate random : {}", password);
            user = new User();
            user.setName(request.getName());
            user.setCreatedDate(new Date());
            user.setPhone(request.getPhone());
            user.setDob(request.getDob());
            user.setGender(gender);
            user.setEmail(request.getEmail());
            user.setStatus(request.getStatus().getStatus());
            user.setPermission(userPermission);
            user.setPassword(AESUtils.encrypt(password, keyAES));
            user.setCreateBy(userAdmin.getName());

            user = userRepository.save(user);
            user.setUserIdSearch(String.valueOf(user.getUserId()));
            user = userRepository.save(user);

            // send email:
            log.info("START... Sending email");
            Mail mail = new Mail();
            mail.setFrom(mailFrom);//replace with your desired email
            mail.setTo(user.getEmail());//replace with your desired email
            mail.setSubject("Cap Tai Khoan");
            Map<String, Object> model = new HashMap<>();
            model.put("username", user.getEmail());
            model.put("password", password);
            mail.setPros(model);
            mail.setTemplate("index");
            emailSenderService.sendEmail(mail);
            log.info("END... Email sent success");
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
        return new UserPageResponse()
            .setPage(page.getNumber())
            .setPageSize(page.getSize())
            .setTotalElement(page.getNumberOfElements())
            .setTotalPage(page.getTotalPages())
            .setUserResponseList(page.getContent().stream().map(UserResponse::new).collect(Collectors.toList()));
    }

    @Override
    public UserResponse getUserInfo() {
        try {
            String email = SecurityUtils.getUsernameAuth();
            User user = userRepository.findByEmail(email).orElse(null);
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
    public UserResponse updateInfoUser(UpdateUserRequest request) {
        try {
            log.info("Update user with request :{}", request.toString());
            String email = SecurityUtils.getUsernameAuth();
            User userAdmin = userRepository.findByEmail(email).orElse(null);
            log.info("User Admin : {}", userAdmin);
            if (Objects.isNull(userAdmin)) {
                throw new BusinessException(ErrorMessage.USER_ADMIN_INVALID);
            }

            // check permission
            boolean isPermission = userPermissionService.checkUpdatePermission(userAdmin.getPermission().getUserManagement());
            if (!isPermission) {
                throw new BusinessException(ErrorMessage.USER_DO_NOT_PERMISSION);
            }

            User user = userRepository.findByUserId(request.getId()).orElse(null);
            if (Objects.isNull(user)) {
                throw new BusinessException(ErrorMessage.USER_NOT_FOUND);
            }

            if (StringUtils.isNoneBlank(request.getName())) {
                user.setName(request.getName());
            }

            if (StringUtils.isNotBlank(request.getDob())) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                Date dateOfBirth = dateFormat.parse(request.getDob());
                user.setDob(dateOfBirth);
            }

            if (StringUtils.isNotBlank(request.getPhone())) {
                user.setPhone(request.getPhone());
            }

            if (Objects.nonNull(request.getGenderTrueMale())) {
                String gender = request.getGenderTrueMale() ? Gender.MALE.getGender() : Gender.FEMALE.getGender();
                user.setGender(gender);
            }
            if (Objects.nonNull(request.getStatus())) {

                user.setStatus(request.getStatus().getStatus());
            }

            user.setModifiedBy(userAdmin.getName());
            user.setModifiedDate(new Date());
            user = userRepository.save(user);
            return new UserResponse(user);
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            throw new BusinessException(ErrorMessage.USER_UPDATE_FAIL);
        }
    }

    @Override
    public UserResponse gantPermissionUser(GantPermissionUserRequest request) {
        try {
            log.info("Change permission user with request :{}", request.toString());
            String email = SecurityUtils.getUsernameAuth();
            User userAdmin = userRepository.findByEmail(email).orElse(null);
            log.info("User Admin : {}", userAdmin);
            if (Objects.isNull(userAdmin)) {
                throw new BusinessException(ErrorMessage.USER_ADMIN_INVALID);
            }

            // check permission
            boolean isPermission = userPermissionService.checkUpdatePermission(userAdmin.getPermission().getUserManagement());
            if (!isPermission) {
                throw new BusinessException(ErrorMessage.USER_DO_NOT_PERMISSION);
            }

            User user = userRepository.findByUserId(request.getId()).orElse(null);
            if (Objects.isNull(user)) {
                throw new BusinessException(ErrorMessage.USER_NOT_FOUND);
            }

            UserPermission userPermission = userPermissionRepository.findFirstByRole(request.getNewPermission().getRole()).orElse(null);
            if (Objects.isNull(userPermission)) {
                throw new BusinessException(ErrorMessage.USER_PERMISSION_INVALID);
            }

            if (userPermission.getRole().equals(Role.SUPER_ADMIN.getRole())
                && !userAdmin.getPermission().getRole().equals(Role.SUPER_ADMIN.getRole())) {
                throw new BusinessException(ErrorMessage.USER_DO_NOT_PERMISSION);
            }

            user.setPermission(userPermission);
            user.setModifiedBy(userAdmin.getName());
            user.setModifiedDate(new Date());
            user = userRepository.save(user);
            return new UserResponse(user);
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            throw new BusinessException(ErrorMessage.USER_UPDATE_FAIL);
        }
    }


    @Override
    public LoginResponse login(LoginRequest request) {
        try {
            User user = userRepository.findByEmail(request.getEmail()).orElse(null);
            if (Objects.isNull(user)) {
                throw new UnauthorizeException(ErrorMessage.USER_NOT_FOUND);
            }
            String passHash = AESUtils.decrypt(user.getPassword(), keyAES);
            log.info("Pass :{}", passHash);
            if (!passHash.equals(request.getPassword())) {
                throw new UnauthorizeException(ErrorMessage.USER_PASSWORD_INCORRECT);
            }

            UserDetailsImpl userDetails = UserDetailsImpl.build(user);
            String accessToken = JWTUtils.generateAccessToken(userDetails, user);
            return new LoginResponse(user, accessToken);

        } catch (UnauthorizeException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnauthorizeException(ErrorMessage.USER_LOGIN_FAIL);
        }
    }


    @Override
    public UserResponse createUserSA(CreateUserSARequest request) {
        try {

//            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
//            Date dateOfBirth = dateFormat.parse(request.getDob());
            String gender = request.isGenderTrueMale() ? Gender.MALE.getGender() : Gender.FEMALE.getGender();
            UserPermission userPermission = userPermissionRepository.findFirstByRole(Role.SUPER_ADMIN.getRole()).orElse(null);

            User user = new User();
            user.setName(request.getName());
            user.setCreatedDate(new Date());
            user.setPhone(request.getPhone());
            user.setDob(request.getDob());
            user.setGender(gender);
            user.setEmail(request.getEmail());
            user.setStatus(request.getStatus().getStatus());
            user.setPermission(userPermission);
            user.setPassword(AESUtils.encrypt(request.getPassword(), keyAES));
            user = userRepository.save(user);
            user.setUserIdSearch(String.valueOf(user.getUserId()));
            user = userRepository.save(user);
            return new UserResponse(user);
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException(ErrorMessage.USER_CREATE_FAIL);
        }
    }


    @Override
    @SneakyThrows
    public UserResponse getUserById(int id) {
        try {
            String email = SecurityUtils.getUsernameAuth();
            User userAdmin = userRepository.findByEmail(email).orElse(null);
            if (Objects.isNull(userAdmin)) {
                throw new BusinessException(ErrorMessage.USER_ADMIN_INVALID);
            }
            User user = userRepository.findByUserId(id).orElse(null);
            if(Objects.isNull(user)) {
                throw new BusinessException(ErrorMessage.USER_NOT_FOUND);
            }
            String pass = "";
            if(Role.SUPER_ADMIN.getRole().equals(userAdmin.getPermission().getRole())){
                pass = AESUtils.decrypt(user.getPassword(), keyAES);
            }
            return new UserResponse(user, pass);
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException(ErrorMessage.USER_GET_FAIL);
        }
    }


    @Override
    public UserResponse changePass(ChangePasswordRequest request) {
        try {
            log.info("Change pass user with request :{}", request.toString());
            String email = SecurityUtils.getUsernameAuth();
            User userAdmin = userRepository.findByEmail(email).orElse(null);
            log.info("User Admin : {}", userAdmin);
            if (Objects.isNull(userAdmin)) {
                throw new BusinessException(ErrorMessage.USER_ADMIN_INVALID);
            }

            // check permission
            if(!Role.SUPER_ADMIN.getRole().equals(userAdmin.getPermission().getRole())) {
                throw new BusinessException(ErrorMessage.USER_DO_NOT_PERMISSION);
            }

            User user = userRepository.findByUserId(request.getId()).orElse(null);
            if (Objects.isNull(user)) {
                throw new BusinessException(ErrorMessage.USER_NOT_FOUND);
            }

            if (!user.getEmail().equals(request.getEmail())) {
                throw new BusinessException(ErrorMessage.USER_EMAIL_NOT_MATCH);
            }
            String pass = AESUtils.encrypt(request.getNewPass(), keyAES);
            user.setPassword(pass);
            user = userRepository.save(user);
            return new UserResponse(user, AESUtils.decrypt(user.getPassword(),keyAES));
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            throw new BusinessException(ErrorMessage.USER_UPDATE_FAIL);
        }
    }

    @Override
    public User getUserById2(int id) {
        return userRepository.getUserById(id);
    }
}
