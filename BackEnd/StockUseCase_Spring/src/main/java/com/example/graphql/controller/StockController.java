package com.example.graphql.controller;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.graphql.dao.StockRepository;
import com.example.graphql.entity.StockBean;

@RestController
@RequestMapping(value = "/Stock")
@CrossOrigin
public class StockController {

	@RequestMapping(value = "/")
	public String helloStock() {
		return "Welcome to Spring boot stock Page";
	}

	@Autowired
	private StockRepository userRepository;

	public StockController(StockRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@RequestMapping(value = "/view")
	public List<?> hello() {
		List<StockBean> activeStock= userRepository.findAll();
		for ( StockBean s : activeStock) {
			if (s.getQuantity()==0) {
				activeStock.remove(s);
			}
		}
		
		activeStock.sort(Comparator.comparing(StockBean::getStockNumber));
		
		return (List<?>) activeStock;

	}
	
	/*
	 * @RequestMapping(value = "/search/{name}") public StockBean
	 * searchByName(@PathVariable String name) {
	 * 
	 * return userRepository.findByNameEquals(name);
	 * 
	 * }
	 */
	
	

	@RequestMapping(value = "/read/{id}")
	public List<?> viewbyStockNumber(@PathVariable int id) {
		StockBean u1 = userRepository.findByIdEquals(id);
		ArrayList<StockBean> u = new ArrayList<>();
		u.add(u1);
		return u;

	}
	
	@RequestMapping(value = "/searchByName/{name}")
	public List<?> viewbyStockName(@PathVariable String name) {
		System.out.println("The name inside controller"+name);
		StockBean u1 = userRepository.findByNameEquals(name);
		ArrayList<StockBean> u = new ArrayList<>();
		u.add(u1);
		return u;

	}

	@RequestMapping(value = "/edit/{id}")
	public List<?> EditByEmpId(@PathVariable int id, @RequestBody StockBean user) {
		StockBean u1 = userRepository.findByIdEquals(id);
		userRepository.delete(u1);
		userRepository.save(user);
		return (List<?>) userRepository.findAll();

	}

	@PostMapping(value = "/signup/")
	public List SignUpUSer(@RequestBody StockBean u1) throws URISyntaxException {
		System.out.println("Emp ID signed up : " + u1.getStockName() + u1.getStockNumber() + u1.getPurchasingDate()
				+ u1.getPurchasingPrice() + u1.getQuantity());
		userRepository.save(u1);
		return (List) userRepository.findAll();
	}

	@RequestMapping(value = "/add")
	public List AddUser() {
		StockBean u1 = new StockBean();
		StockBean u2 = new StockBean();

		u1.setStockNumber(100);
		u1.setStockName("Milk");
		u1.setPurchasingDate(new Date());
		u1.setPurchasingPrice(2000);
		u1.setQuantity(100);

		u2.setStockNumber(101);
		u2.setStockName("Dal");
		u2.setPurchasingDate(new Date());
		u2.setPurchasingPrice(3000);
		u2.setQuantity(95);

		/*
		 * UserLogin u3 = userRepository.findByIdEquals(u1.getId());
		 * System.out.println(u3);
		 */
		userRepository.save(u1);
		userRepository.save(u2);

		return (List) userRepository.findAll();

	}

	/*
	 * @RequestMapping(value="/delete") public List DeleteUser(){
	 * 
	 * UserLogin u1 = new UserLogin(); u1 = userRepository.findByIdEquals("");
	 * userRepository.delete(u1);
	 * 
	 * 
	 * return (List) userRepository.findAll();
	 * 
	 * }
	 */

	@RequestMapping(value = "/allDelete")
	public List AllDeleteUser() {

		userRepository.deleteAll();

		return (List) userRepository.findAll();

	}

}
